import { Button } from '../ui/button'
import { DialogClose, DialogFooter, DialogHeader } from '../ui/dialog'
import { Art, ResellTransaction, ResponseObj } from '~/types'
import { User } from '~/types/User.ts'
import { useParams } from 'react-router'
import { format } from 'date-fns'
import { useQuery } from 'react-query'

type ArtDetail = Art & {
  owner?: User
}

const fetchArtHistory = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/resell-transaction/art/${id}`)
  const data = (await res.json()) as ResponseObj<ResellTransaction[]>
  return data.data
}

const fetchOwner = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/arts/${id}`)
  const data = (await res.json()) as ResponseObj<ArtDetail>
  return data.data
}

const ActivityLog = () => {
  const { artId } = useParams()

  const { data: artHistory } = useQuery<ResellTransaction[], Error>(['art-history', artId], () =>
    fetchArtHistory(artId || '0')
  )

  const { data: artOwner } = useQuery<ArtDetail, Error>(['art-owner', artId], () => fetchOwner(artId || '0'))

  if (!artHistory || !artOwner) {
    return <div>Something went wrong...</div>
  }

  const formatDate = (date: Date): string => {
    return format(date, 'MMM d, yyyy')
  }

  return (
    <>
      <DialogHeader className='mb-4 text-lg font-bold'>Activity Log</DialogHeader>

      {artHistory.map((historyList, index) => (
        <div className='bg-secondary rounded-xl overflow-hidden p-3 mb-4' key={index}>
          <div className='flex items-center'>
            <div className='mr-4 flex items-center'>
              <img
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                alt='Featured'
                className='w-16 h-16 rounded'
              />
            </div>
            <div className='flex-1'>
              <p className='font-bold'>{historyList.buyerUser.username}</p>
              <p className=''>{index === 0 ? 'Current Owner' : 'Previous Owner'}</p>
            </div>
            <div>
              <p className=''>Bought for ${historyList.transactionFee}</p>
              <p className='text-right'>{formatDate(historyList.date)}</p>
            </div>
          </div>
        </div>
      ))}

      <div className='bg-secondary rounded-xl overflow-hidden p-3 mb-4'>
        <div className='flex items-center'>
          <div className='mr-4 flex items-center'>
            <img
              src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
              alt='Featured'
              className='w-16 h-16 rounded'
            />
          </div>
          <div className='flex-1'>
            <p className='font-bold'>{artOwner.owner?.username}</p>
            <p className=''>Creator</p>
          </div>
          <div>
            <p className='font-bold'>Created</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>
            Got it
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default ActivityLog
