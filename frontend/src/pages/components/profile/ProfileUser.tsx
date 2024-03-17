import BannerProfile from './BannerProfile'
import ContentProfile from './ContentProfile'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

export default function ProfileUser() {
  const { userId } = useParams()
  console.log(userId)
  const fetchUser = async () => {
    const res = await axios.get(`/users/${userId}`)
    return res.data
  }
  const { data, isLoading, error } = useQuery(['user', userId], fetchUser)
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>An error has occurred:</div>

  return (
    <div className='bg-slate-300'>
      <div className='container mx-auto px-6 py-3'>
        <BannerProfile user={data} />
        <ContentProfile />
      </div>
    </div>
  )
}
