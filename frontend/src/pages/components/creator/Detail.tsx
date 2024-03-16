import React from 'react'

interface UserPreOrder {
  avatar?: string // Giả sử avatar có thể không tồn tại, do đó là optional
  name: string
  offer: number
  description: string
  status: boolean
}
interface UserDetailProps {
  user: UserPreOrder
  onBack: () => void // onBack là một function không nhận tham số và không trả về gì
}
const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  return (
    <div className='flex w-full mt-16'>
      {/* Khung chat chiếm 2/3 không gian */}
      {user.status && <div className='w-2/3 p-4 border rounded-l-lg h-96 bg-white'>Chat functionality goes here.</div>}

      {/* Card thông tin người dùng chiếm 1/3 không gian */}
      <div className='w-1/3 relative mx-12 my-12'>
        <div className='rounded overflow-hidden shadow-md bg-white'>
          <div className='absolute -mt-20 w-full flex justify-center'>
            <div className='h-32 w-32'>
              <img
                src={user.avatar || 'https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif'}
                alt='Display Picture of User'
                role='img'
                className='rounded-full object-cover h-full w-full shadow-md'
              />
            </div>
          </div>
          <div className='px-6 mt-16'>
            <h1 className='font-bold text-2xl text-center mb-1'>{user.name}</h1>
            <p className='text-gray-800 text-xl text-center'>{user.offer}€</p>
            <p className='text-center text-gray-600 text-base pt-3 font-normal'>{user.description}</p>
            <div className='w-full flex justify-center pt-5 pb-5'>
              <button onClick={onBack} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
