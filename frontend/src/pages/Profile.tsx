import { Spinner } from '@material-tailwind/react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router'
import ArtList from '~/components/ProfilePage/ArtList'
import PreOrderDialog from '~/components/ProfilePage/PreOrderDialog'
import { Button } from '~/components/ui/button'
import useAuth from '~/hooks/useAuth'
import { ResponseObj } from '~/types'
import { User } from '~/types/User'

const fetchProfile = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users/${id}`)
  const data = (await res.json()) as ResponseObj<User>
  return data.data
}

const Profile = () => {
  const { userId } = useParams()

  const { isFetching, isError, data } = useQuery<User, Error>(['profile', userId], () => fetchProfile(userId || '0'))
  const { user } = useAuth()

  if (isError) {
    return <div>Failed to fetch profile</div>
  }

  if (isFetching) return <Spinner />
  if (!data) return <Navigate to='/404' replace />

  return (
    <div className='mb-4 pt-10 space-y-5'>
      {/* Banner section */}
      <div className='bg-background rounded-xl overflow-hidden'>
        <div className='relative w-full object-fill h-80'>
          <img
            src={
              data.bannerImg ||
              'https://www.artfol-image.me/5f63228178773c3863b1af5b/8694c15ca4e148e0b37abf855eb25cd1.jpg'
            }
            alt=''
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex h-24 gap-3 mb-4 relative -top-8 items-center'>
          <div className='relative w-40 h-40 ml-10'>
            <img
              src={data.avatar || 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png'}
              alt=''
              className='rounded-full border-border bg-background border-8 aspect-square'
            />
          </div>
          <div className='mt-2 space-y-2'>
            <div>
              {user?.email === data.email ? (
                <Button className='font-semibold rounded-xl'>Edit Profile</Button>
              ) : (
                <div className='space-x-2'>
                  <Button className='font-semibold rounded-xl'>Follow</Button>
                  {data.isCreator && <PreOrderDialog />}
                </div>
              )}
            </div>
            <div className='font-bold text-3xl'>{data.username}</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-start gap-5'>
        <div className='w-full md:basis-1/3 space-y-5'>
          <div className='bg-background rounded-xl shadow-sm p-5 text-sm space-y-5'>
            <p className='text-sm font-semibold'>About</p>
            <div>{data.about || 'This user has not written anything about themselves yet.'}</div>
          </div>

          <div className='bg-background rounded-xl shadow-sm p-5 text-sm space-y-5'>
            <p className='text-sm font-semibold'>Collections</p>
            <div className='flex gap-2.5 flex-wrap'>
              <div className='block w-[48%] relative rounded-lg overflow-hidden aspect-square'>
                <img src='https://i.imgur.com/6rp0Xs2.png' alt='' className='w-full h-full object-cover' />
                <div className='bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity'>
                  <span className='absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate'>
                    Favorite
                  </span>
                </div>
              </div>

              <div className='block w-[48%] relative rounded-lg overflow-hidden aspect-square'>
                <img src='https://i.imgur.com/6rp0Xs2.png' alt='' className='w-full h-full object-cover' />
                <div className='bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity'>
                  <span className='absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate'>
                    Anime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full md:basis-2/3 bg-background rounded-xl shadow-sm p-5 text-sm space-y-5'>
          <p className='text-sm font-semibold'>Gallery</p>
          <ArtList />
        </div>
      </div>
    </div>
  )
}

export default Profile
