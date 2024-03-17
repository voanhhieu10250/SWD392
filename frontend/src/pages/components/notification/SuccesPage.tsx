import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '~/components/common/Spinner'
import useAuth from '~/hooks/useAuth'

const SuccessPage = () => {
  const { user, reAuthenticate } = useAuth()
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const paymentId = queryParams.get('paymentId')
    const PayerID = queryParams.get('PayerID')
    // console.log('paymentId: ', paymentId)
    // console.log('PayerID: ', PayerID)

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/paypal/execute?paymentId=${paymentId}&PayerID=${PayerID}&userId=${user?.id}`
        )
        const data = await response.json()

        if (response.ok && data.msg === '200') {
          console.log('Payment: ', data)
          toast.success('Thanh toán thành công!')
          await reAuthenticate()
        } else {
          toast.error('Thanh toán thất bại.')
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra: ' + (error as Error).message)
      } finally {
        setLoading(false)
        navigate('/payment', { replace: true })
      }
    }

    if (paymentId && PayerID && user) {
      verifyPayment()
    }
  }, [location, navigate, user])

  return <div>{loading ? <Spinner /> : <div>Đang chuyển hướng...</div>}</div>
}

export default SuccessPage
