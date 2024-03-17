import { format } from 'date-fns'
import { useQuery } from 'react-query'
import { Navigate, useMatch, useParams } from 'react-router'
import Spinner from '~/components/common/Spinner'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import { cn } from '~/lib/utils'
import { PreOrderStatus, ResponseObj } from '~/types'
import { User } from '~/types/User'

type PreOrder = {
  id: number
  creator: User
  customer: User
  message: string
  reply: string
  status: string
  price: number
  date: string
}

const fetchPreOrderDetail = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders/${id}`)
  const data = (await res.json()) as ResponseObj<PreOrder>
  return data.data
}

const ChatDisplay = () => {
  const { itemId } = useParams()
  const orderMatch = useMatch('/creator/dashboard/preorder-orders/:id')

  const { isFetching, isError, data } = useQuery<PreOrder, Error>(['preorder', itemId], () =>
    fetchPreOrderDetail(itemId || '0')
  )

  if (isError) {
    return <div className='p-8 text-center text-muted-foreground'>Failed to fetch pre-order</div>
  }

  if (isFetching) return <Spinner />
  if (!data) return <Navigate to='/404' replace />

  return (
    <div className='flex h-full flex-col'>
      <div className='flex flex-1 flex-col'>
        <div className='flex items-start p-4'>
          <div className='flex items-start gap-4 text-sm'>
            <Avatar>
              <AvatarImage alt={data.customer.avatar} />
              <AvatarFallback>
                {data.customer.username
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <div className='font-semibold'>{data.customer.username}</div>
              <div className='line-clamp-1 font-bold'>
                Offer: <span className='text-red-500'>{data.price}$</span>
              </div>
              <div className='line-clamp-1 font-bold'>
                Status:{' '}
                <span
                  className={cn('font-bold', {
                    'text-orange-500': data.status === PreOrderStatus.PENDING,
                    'text-red-500': data.status === PreOrderStatus.REJECTED,
                    'text-green-500': data.status === PreOrderStatus.ACCEPTED
                  })}
                >
                  {data.status}
                </span>
              </div>
            </div>
          </div>
          {data.date && (
            <div className='ml-auto text-xs text-muted-foreground'>{format(new Date(data.date), 'PPpp')}</div>
          )}
        </div>
        <Separator />
        <div className='flex-1 rounded-xl overflow-hidden border-border p-4 text-sm'>
          <div className='whitespace-pre-wrap'>{data.message}</div>
        </div>

        {!orderMatch && (
          <>
            <Separator className='mt-auto' />
            <div className='p-4'>
              <form>
                <div className='grid gap-4'>
                  <Textarea className='p-4' placeholder={`Reply ${data.customer.username}...`} />
                  <div className='flex items-center justify-end gap-3'>
                    <Button onClick={(e) => e.preventDefault()} size='sm' variant='destructive'>
                      Reject
                    </Button>
                    <Button onClick={(e) => e.preventDefault()} size='sm'>
                      Accept
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatDisplay
