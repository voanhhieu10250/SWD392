import { Heart } from 'lucide-react'
import { useQuery } from 'react-query'
import { Link, Navigate, useParams } from 'react-router-dom'
import ActivitiLogDialog from '~/components/ArtDetailPage/ActivitiLogDialog'
import AddCollectionDialog from '~/components/ArtDetailPage/AddCollectionDialog'
import MakeOfferDialog from '~/components/ArtDetailPage/MakeOfferDialog'
import ReportPopup from '~/components/ArtDetailPage/ReportPopup'
import ShareDialog from '~/components/ArtDetailPage/ShareDialog'
import Spinner from '~/components/common/Spinner'
import { Badge } from '~/components/ui/badge'
import useAuth from '~/hooks/useAuth'
import { Art, ArtType, ResponseObj } from '~/types'
import { User } from '~/types/User'

type ArtDetail = Art & {
  owner?: User
}

const fetchProfile = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/arts/${id}`)
  const data = (await res.json()) as ResponseObj<ArtDetail>
  return data.data
}

const ArtDetail = () => {
  const { artId } = useParams()

  const { isFetching, isError, data } = useQuery<ArtDetail, Error>(['profile', artId], () => fetchProfile(artId || '0'))
  const { user } = useAuth()

  if (isError) {
    return <div>Failed to fetch profile</div>
  }

  if (isFetching) return <Spinner />
  if (!data) return <Navigate to='/404' replace />

  // to,gd,sd -> #to #gd #sd
  const transformTags = (tags: string) => {
    return tags
      .split(',')
      .map((tag) => '#' + tag.trim())
      .join(' ')
  }

  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center py-4 gap-5'>
        <div className='relative md:w-[63%]'>
          {data.owner && (
            <Link to={'/profile/' + data.owner.id} className='flex justify-start items-center gap-4'>
              <div className='relative w-[50px] h-[50px] overflow-hidden rounded-full bg-background'>
                <img
                  src={
                    data.owner.avatar ||
                    'https://miro.medium.com/v2/resize:fit:640/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png'
                  }
                  alt='avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <p className='text-xl font-semibold'>{data.owner.username}</p>
              </div>
            </Link>
          )}
        </div>
        <div className='flex-1 flex items-center gap-3 flex-row-reverse md:flex-row'>
          <ShareDialog value={'http://localhost:3000/art/' + artId} />
          {data.artType === ArtType.digital && (
            <div className='p-1 flex items-center space-x-1'>
              <span className='text-sm font-semibold'>{data.downloads || 0} Premium downloads</span>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-5 relative items-start'>
        {/* main image  */}
        <div className='relative md:w-[63%] h-auto rounded-xl overflow-hidden shadow-sm'>
          {data.artType === ArtType.physical ? (
            <img src={data.originUrl} alt='Art work' className='w-full h-auto' />
          ) : (
            <img
              src={user?.isPremiumAudience ? data.originUrl : data.watermarkedUrl}
              alt='Art work'
              className='w-full h-auto'
            />
          )}
        </div>

        {/* details */}
        <div className='w-full flex-1 sticky top-24 space-y-5'>
          <div className='bg-background rounded-xl overflow-hidden space-y-4 pt-6 pb-4 px-4 shadow-sm'>
            <p className='text-xl font-semibold break-all'>{data.title}</p>
            <div className='!mt-1'>
              <Badge variant={data.artType === ArtType.physical ? 'destructive' : 'secondary'}>
                {data.artType === ArtType.digital ? 'Digital art' : 'Physical art'}
              </Badge>
            </div>
            <p className='leading-tight break-all'>{data.description}</p>

            <p className='text-muted-foreground text-sm break-words'>{transformTags(data.tags || '')}</p>
            <div className='flex items-center gap-3'>
              <button className='p-1 flex items-center space-x-1'>
                <Heart />
                <span className='text-sm font-semibold'>{data.likes || 0} likes</span>
              </button>
              <AddCollectionDialog artId={data.id} />
            </div>
          </div>
          {data.artType === ArtType.physical && (
            <>
              {data.owner && user && data.owner?.id !== user?.id && <MakeOfferDialog creatorId={data.owner.id} />}
              {data.owner && <ReportPopup creatorId={data.owner.id} />}
              <ActivitiLogDialog artId={artId} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtDetail
