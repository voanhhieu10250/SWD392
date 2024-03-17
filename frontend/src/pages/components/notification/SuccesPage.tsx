import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const paymentId = queryParams.get('paymentId')
    const token = queryParams.get('token')
    const PayerID = queryParams.get('PayerID')

    if (paymentId && token && PayerID) {
      navigate('/notification', { state: { paymentSuccess: true, paymentId, token, PayerID } })
    } else {
      navigate('/notification', { state: { paymentSuccess: false } })
    }
  }, [location, navigate])

  return <div>Redirecting...</div>
}

export default SuccessPage
