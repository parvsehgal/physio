'use client'

import { useState } from 'react'
import { createPaymentIntent, confirmPayment } from '@/lib/actions/payment'

export default function PaymentForm({ bookingId, amount, onPaymentSuccess, onPaymentError }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [showCardForm, setShowCardForm] = useState(false)

  const handlePayNow = async () => {
    try {
      setIsProcessing(true)
      setPaymentError('')

      // Create payment intent
      const result = await createPaymentIntent({
        bookingId,
        amount: parseFloat(amount)
      })

      if (!result.success) {
        setPaymentError(result.error)
        return
      }

      setClientSecret(result.data.clientSecret)
      setShowCardForm(true)
    } catch (error) {
      setPaymentError('Failed to initialize payment')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMockCardPayment = async () => {
    try {
      setIsProcessing(true)
      
      // Mock successful payment - in real implementation this would be handled by Stripe Elements
      // For demo purposes, we'll simulate a successful payment
      const mockPaymentIntentId = clientSecret.split('_secret_')[0]
      
      // In a real app, Stripe would handle the card processing
      // Here we'll just confirm the payment directly
      const confirmResult = await confirmPayment({ 
        paymentIntentId: mockPaymentIntentId 
      })

      if (confirmResult.success) {
        onPaymentSuccess && onPaymentSuccess({
          paymentIntentId: mockPaymentIntentId,
          status: 'completed'
        })
      } else {
        setPaymentError(confirmResult.error || 'Payment confirmation failed')
        onPaymentError && onPaymentError(confirmResult.error)
      }
    } catch (error) {
      const errorMessage = 'Payment processing failed'
      setPaymentError(errorMessage)
      onPaymentError && onPaymentError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Consultation Fee:</span>
          <span className="font-semibold text-gray-900">€{amount}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-lg font-semibold text-gray-900">€{amount}</span>
        </div>
      </div>

      {paymentError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{paymentError}</p>
        </div>
      )}

      {!showCardForm ? (
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Initializing Payment...' : 'Pay Now'}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Mock card form - in real implementation, use Stripe Elements */}
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Card Information</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This is a demonstration. No real payment will be processed.
              Click "Complete Payment" to simulate a successful transaction.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowCardForm(false)}
              disabled={isProcessing}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleMockCardPayment}
              disabled={isProcessing}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>Powered by Stripe</p>
      </div>
    </div>
  )
}