import { format } from 'date-fns'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
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

const fetchPreOrderDetail = async (id: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders/${id}`)
  const data = (await res.json()) as ResponseObj<PreOrder>
  return data.data
}

const ChatDisplay = ({ orderMatch, itemId }: { orderMatch: boolean; itemId?: number }) => {
  const [updating, setUpdating] = useState(false)
  const [reply, setReply] = useState('')

  const { isFetching, isError, data, refetch } = useQuery<PreOrder, Error>(['preorder', itemId], () =>
    fetchPreOrderDetail(itemId || 0)
  )

  if (isError) {
    return <div className='p-8 text-center text-muted-foreground'>Failed to fetch pre-order</div>
  }

  if (isFetching) return <Spinner />

  const handleAccept = async () => {
    if (updating) return
    if (!reply) {
      toast.error('Reply is required')
      return
    }
    try {
      setUpdating(true)

      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: PreOrderStatus.ACCEPTED,
          reply
        })
      })

      toast.success('Pre-order accepted')
      refetch()
    } catch (error) {
      console.error(error)
      toast.error('Failed to accept pre-order')
    }
    setUpdating(false)
  }

  const handleReject = async () => {
    if (updating) return
    if (!reply) {
      toast.error('Reply is required')
      return
    }
    try {
      setUpdating(true)

      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: PreOrderStatus.REJECTED,
          reply
        })
      })

      toast.success('Pre-order rejected')
      refetch()
    } catch (error) {
      console.error(error)
      toast.error('Failed to reject pre-order')
    }
    setUpdating(false)
  }

  return (
    <div className='flex h-full flex-col'>
      {data ? (
        <div className='flex flex-1 flex-col'>
          <div className='flex items-start p-4'>
            <div className='flex items-center gap-4 text-sm'>
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
                  Offer: <span className='text-red-500'>{data.price} $</span>
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
          <div className='flex-1 p-4 text-sm space-y-5'>
            <div className='whitespace-pre-wrap rounded-xl overflow-hidden border-border bg-secondary p-4'>
              {data.message}
            </div>
            {data.reply && (
              <div
                className={cn('whitespace-pre-wrap rounded-xl overflow-hidden border-border p-4 bg-secondary', {
                  'bg-red-200': data.status === PreOrderStatus.REJECTED,
                  'bg-green-200': data.status === PreOrderStatus.ACCEPTED
                })}
              >
                {data.reply}
              </div>
            )}
          </div>

          {!orderMatch && data.status === PreOrderStatus.PENDING && (
            <>
              <Separator className='mt-auto' />
              <div className='p-4'>
                <form>
                  <div className='grid gap-4'>
                    <Textarea
                      className='p-4'
                      placeholder={`Reply ${data.customer.username}...`}
                      value={reply}
                      onChange={(e) => {
                        setReply(e.target.value)
                      }}
                    />
                    <div className='flex items-center justify-end gap-3'>
                      <Button onClick={handleReject} size='sm' variant='destructive' type='button'>
                        Reject
                      </Button>
                      <Button onClick={handleAccept} size='sm' type='button'>
                        Accept
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>No data selected</div>
      )}
    </div>
  )
}

export default ChatDisplay
