import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' // Đảm bảo đã cài đặt thư viện này hoặc một thư viện toast tương tự
import Spinner from '~/components/common/Spinner' // Giả sử đường dẫn này đúng

const SuccessPage = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const paymentId = queryParams.get('paymentId')
    const PayerID = queryParams.get('PayerID')
    console.log('paymentId: ', paymentId)
    console.log('PayerID: ', PayerID)
    // Gọi API để gửi dữ liệu về BE
    const verifyPayment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/paypal/execute?paymentId=${paymentId}&PayerID=${PayerID}`)
        const data = await response.json()

        // Kiểm tra kết quả trả về từ BE
        if (response.ok && data.msg === '200') {
          // Giả sử trạng thái thành công là 'approved'
          toast.success('Thanh toán thành công!')
        } else {
          toast.error('Thanh toán thất bại.')
        }
      } catch (error: any) {
        toast.error('Có lỗi xảy ra: ' + error.message)
      } finally {
        setLoading(false)
        navigate('/payment') // Chuyển hướng ngay cả khi có lỗi
      }
    }

    if (paymentId && PayerID) {
      verifyPayment()
    } else {
      toast.error('Thông tin thanh toán không đầy đủ.')
      setLoading(false)
      navigate('/payment') // Chuyển hướng ngay cả khi thông tin không đầy đủ
    }
  }, [location, navigate])

  return (
    <div>
      {loading ? (
        <Spinner /> // Hiển thị spinner khi đang tải
      ) : (
        <div>Đang chuyển hướng...</div>
      )}
    </div>
  )
}

export default SuccessPage
