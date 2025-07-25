'use server'

import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createPaymentIntent({
  bookingId,
  amount,
  currency = 'EUR'
}) {
  try {
    if (!bookingId || !amount) {
      return { success: false, error: 'Missing required fields: bookingId, amount' }
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { patient: true, physiotherapist: { include: { user: true } } }
    })

    if (!booking) {
      return { success: false, error: 'Booking not found' }
    }

    // Check if payment already exists for this booking
    const existingPayment = await prisma.payment.findFirst({
      where: { bookingId }
    })

    if (existingPayment && existingPayment.status !== 'failed') {
      return { success: false, error: 'Payment already exists for this booking' }
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        bookingId: bookingId.toString(),
        patientId: booking.patientId.toString(),
        physiotherapistId: booking.physiotherapistId.toString()
      }
    })

    // Get payment method ID (default to credit card)
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { name: 'Credit Card' }
    })

    if (!paymentMethod) {
      return { success: false, error: 'Payment method not configured' }
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        paymentMethodId: paymentMethod.id,
        amount,
        currency,
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      }
    })

    return { 
      success: true, 
      data: {
        paymentId: payment.id,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount,
        currency
      }
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return { success: false, error: `Failed to create payment: ${error.message}` }
  } finally {
    await prisma.$disconnect()
  }
}

export async function confirmPayment({ paymentIntentId }) {
  try {
    if (!paymentIntentId) {
      return { success: false, error: 'Payment intent ID is required' }
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Find payment record
    const payment = await prisma.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
      include: { booking: true }
    })

    if (!payment) {
      return { success: false, error: 'Payment record not found' }
    }

    if (paymentIntent.status === 'succeeded') {
      // Update payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'completed',
          processedAt: new Date(),
          transactionId: paymentIntent.id
        }
      })

      // Update booking status to confirmed if it was pending
      if (payment.booking.statusId) {
        const confirmedStatus = await prisma.bookingStatus.findFirst({
          where: { name: 'confirmed' }
        })

        if (confirmedStatus) {
          await prisma.booking.update({
            where: { id: payment.bookingId },
            data: { statusId: confirmedStatus.id }
          })
        }
      }

      return { success: true, data: { paymentStatus: 'completed' } }
    } else if (paymentIntent.status === 'payment_failed') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' }
      })

      return { success: false, error: 'Payment failed' }
    }

    return { success: true, data: { paymentStatus: paymentIntent.status } }
  } catch (error) {
    console.error('Error confirming payment:', error)
    return { success: false, error: `Failed to confirm payment: ${error.message}` }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getPaymentsByBooking(bookingId) {
  try {
    const payments = await prisma.payment.findMany({
      where: { bookingId },
      include: {
        paymentMethod: { select: { name: true } },
        booking: {
          select: {
            bookingReference: true,
            totalAmount: true,
            patient: { select: { firstName: true, lastName: true, email: true } },
            physiotherapist: {
              include: { user: { select: { firstName: true, lastName: true } } }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      amount: parseFloat(payment.amount.toString()),
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod.name,
      processedAt: payment.processedAt,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      booking: payment.booking
    }))

    return { success: true, data: formattedPayments }
  } catch (error) {
    console.error('Error fetching payments:', error)
    return { success: false, error: 'Failed to fetch payments' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function releasePaymentToTherapist({ paymentId, adminUserId }) {
  try {
    if (!paymentId || !adminUserId) {
      return { success: false, error: 'Payment ID and admin user ID required' }
    }

    // Verify admin user
    const admin = await prisma.user.findUnique({
      where: { id: adminUserId },
      include: { role: true }
    })

    if (!admin || admin.role.name !== 'Admin') {
      return { success: false, error: 'Unauthorized: Admin access required' }
    }

    // Get payment details
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        booking: {
          include: {
            physiotherapist: { include: { user: true } }
          }
        }
      }
    })

    if (!payment) {
      return { success: false, error: 'Payment not found' }
    }

    if (payment.status !== 'completed') {
      return { success: false, error: 'Payment must be completed before release' }
    }

    // In a real implementation, you would integrate with Stripe Connect
    // to transfer funds to the physiotherapist's account
    // For now, we'll create a notification record

    await prisma.notification.create({
      data: {
        userId: payment.booking.physiotherapist.userId,
        title: 'Payment Released',
        message: `Payment of €${payment.amount} for booking ${payment.booking.bookingReference} has been released to your account.`,
        type: 'payment'
      }
    })

    // Update payment with release info (you might add releaseDate field to schema)
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        // In a full implementation, you'd track release status
        // For now, we'll use the existing structure
        processedAt: new Date()
      }
    })

    return { 
      success: true, 
      data: { 
        message: 'Payment released to physiotherapist successfully',
        therapistName: `${payment.booking.physiotherapist.user.firstName} ${payment.booking.physiotherapist.user.lastName}`,
        amount: parseFloat(payment.amount.toString())
      }
    }
  } catch (error) {
    console.error('Error releasing payment:', error)
    return { success: false, error: `Failed to release payment: ${error.message}` }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllPaymentsForAdmin() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        paymentMethod: { select: { name: true } },
        booking: {
          select: {
            bookingReference: true,
            appointmentDate: true,
            appointmentTime: true,
            totalAmount: true,
            patient: { select: { firstName: true, lastName: true, email: true } },
            physiotherapist: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } }
            },
            clinic: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      amount: parseFloat(payment.amount.toString()),
      currency: payment.currency,
      status: payment.status,
      paymentMethod: payment.paymentMethod.name,
      processedAt: payment.processedAt,
      createdAt: payment.createdAt,
      transactionId: payment.transactionId,
      stripePaymentIntentId: payment.stripePaymentIntentId,
      booking: {
        ...payment.booking,
        physiotherapist: `Dr. ${payment.booking.physiotherapist.user.firstName} ${payment.booking.physiotherapist.user.lastName}`,
        physiotherapistEmail: payment.booking.physiotherapist.user.email,
        patient: `${payment.booking.patient.firstName} ${payment.booking.patient.lastName}`,
        patientEmail: payment.booking.patient.email
      }
    }))

    return { success: true, data: formattedPayments }
  } catch (error) {
    console.error('Error fetching admin payments:', error)
    return { success: false, error: 'Failed to fetch payments' }
  } finally {
    await prisma.$disconnect()
  }
}

export async function refundPayment({ paymentId, adminUserId, reason }) {
  try {
    if (!paymentId || !adminUserId) {
      return { success: false, error: 'Payment ID and admin user ID required' }
    }

    // Verify admin user
    const admin = await prisma.user.findUnique({
      where: { id: adminUserId },
      include: { role: true }
    })

    if (!admin || admin.role.name !== 'Admin') {
      return { success: false, error: 'Unauthorized: Admin access required' }
    }

    // Get payment details
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { booking: { include: { patient: true } } }
    })

    if (!payment) {
      return { success: false, error: 'Payment not found' }
    }

    if (payment.status !== 'completed') {
      return { success: false, error: 'Only completed payments can be refunded' }
    }

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: payment.stripePaymentIntentId,
      reason: 'requested_by_customer'
    })

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'refunded' }
    })

    // Notify patient
    await prisma.notification.create({
      data: {
        userId: payment.booking.patientId,
        title: 'Payment Refunded',
        message: `Your payment of €${payment.amount} for booking ${payment.booking.bookingReference} has been refunded. ${reason ? `Reason: ${reason}` : ''}`,
        type: 'payment'
      }
    })

    return { 
      success: true, 
      data: { 
        message: 'Payment refunded successfully',
        refundId: refund.id,
        amount: parseFloat(payment.amount.toString())
      }
    }
  } catch (error) {
    console.error('Error refunding payment:', error)
    return { success: false, error: `Failed to refund payment: ${error.message}` }
  } finally {
    await prisma.$disconnect()
  }
}