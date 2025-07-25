'use client'

import React, { useState, useEffect } from 'react'
import { 
  CreditCard, 
  DollarSign, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react'
import { getAllPaymentsForAdmin, releasePaymentToTherapist, refundPayment } from '@/lib/actions/payment'
import { getCurrentUser } from '@/lib/auth'

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('details') // 'details', 'release', 'refund'
  const [processingAction, setProcessingAction] = useState(false)
  const [refundReason, setRefundReason] = useState('')

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchPayments()
    }
  }, [currentUser])

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const result = await getAllPaymentsForAdmin()
      if (result.success) {
        setPayments(result.data)
      } else {
        console.error('Error fetching payments:', result.error)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReleasePayment = async () => {
    if (!selectedPayment || !currentUser) return

    try {
      setProcessingAction(true)
      const result = await releasePaymentToTherapist({
        paymentId: selectedPayment.id,
        adminUserId: currentUser.id
      })

      if (result.success) {
        await fetchPayments() // Refresh the list
        setShowModal(false)
        setSelectedPayment(null)
        alert('Payment released successfully!')
      } else {
        alert(`Failed to release payment: ${result.error}`)
      }
    } catch (error) {
      alert('Error releasing payment')
    } finally {
      setProcessingAction(false)
    }
  }

  const handleRefundPayment = async () => {
    if (!selectedPayment || !currentUser) return

    try {
      setProcessingAction(true)
      const result = await refundPayment({
        paymentId: selectedPayment.id,
        adminUserId: currentUser.id,
        reason: refundReason
      })

      if (result.success) {
        await fetchPayments() // Refresh the list
        setShowModal(false)
        setSelectedPayment(null)
        setRefundReason('')
        alert('Payment refunded successfully!')
      } else {
        alert(`Failed to refund payment: ${result.error}`)
      }
    } catch (error) {
      alert('Error refunding payment')
    } finally {
      setProcessingAction(false)
    }
  }

  const openModal = (payment, type) => {
    setSelectedPayment(payment)
    setModalType(type)
    setShowModal(true)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'refunded':
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'refunded':
        return `${baseClasses} bg-blue-100 text-blue-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.booking.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.booking.physiotherapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount
          bValue = b.amount
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'date':
        default:
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const Modal = () => {
    if (!showModal || !selectedPayment) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {modalType === 'details' && 'Payment Details'}
              {modalType === 'release' && 'Release Payment'}
              {modalType === 'refund' && 'Refund Payment'}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {modalType === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-700">Amount:</label>
                  <p>€{selectedPayment.amount}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Status:</label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedPayment.status)}
                    <span className={getStatusBadge(selectedPayment.status)}>
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Patient:</label>
                  <p>{selectedPayment.booking.patient}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Therapist:</label>
                  <p>{selectedPayment.booking.physiotherapist}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Booking Ref:</label>
                  <p>{selectedPayment.booking.bookingReference}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Created:</label>
                  <p>{new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                {selectedPayment.status === 'completed' && (
                  <button
                    onClick={() => setModalType('release')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Release to Therapist
                  </button>
                )}
                {selectedPayment.status === 'completed' && (
                  <button
                    onClick={() => setModalType('refund')}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Refund
                  </button>
                )}
              </div>
            </div>
          )}

          {modalType === 'release' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Release payment of €{selectedPayment.amount} to {selectedPayment.booking.physiotherapist}?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalType('details')}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReleasePayment}
                  disabled={processingAction}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {processingAction ? 'Releasing...' : 'Confirm Release'}
                </button>
              </div>
            </div>
          )}

          {modalType === 'refund' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Refund payment of €{selectedPayment.amount} to {selectedPayment.booking.patient}?
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Reason (Optional):
                </label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Enter reason for refund..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalType('details')}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefundPayment}
                  disabled={processingAction}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {processingAction ? 'Processing...' : 'Confirm Refund'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  if (currentUser.role?.name !== 'Admin') {
    return <div>Access denied. Admin access required.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Manage and release payments to physiotherapists</p>
          </div>
          <button
            onClick={fetchPayments}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  €{payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <RefreshCw className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Refunded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'refunded').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search patients, therapists, refs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="status">Sort by Status</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading payments...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Therapist
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.booking.patient}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.booking.patientEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.booking.physiotherapist}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.booking.physiotherapistEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          €{payment.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <span className={getStatusBadge(payment.status)}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openModal(payment, 'details')}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPayments.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No payments found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Modal />
    </div>
  )
}