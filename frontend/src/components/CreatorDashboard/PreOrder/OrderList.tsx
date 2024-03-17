import { format } from 'date-fns'
import { useQuery } from 'react-query'
import Spinner from '~/components/common/Spinner'
import { ScrollArea } from '~/components/ui/scroll-area'
import useAuth from '~/hooks/useAuth'
import { cn } from '~/lib/utils'
import { PreOrderStatus, ResponseObj } from '~/types'

type Offer = {
  id: number
  creatorName: string
  message: string
  status: PreOrderStatus
  price: number
  date: string
}

const fetchOrders = async (customerId: number) => {
  if (!customerId) return []
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/pre-orders/customer/${customerId}`)
  const data = (await res.json()) as ResponseObj<Offer[]>
  return data.data
}

const OrderList = ({
  selectedId,
  setSelectedId
}: {
  selectedId: number | null
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { user } = useAuth()
  const { isFetching, isError, data } = useQuery<Offer[], Error>('preorder-orders', () => fetchOrders(user?.id || 0))

  if (isError) {
    return <div>Failed to fetch orders</div>
  }

  if (isFetching) return <Spinner />
  if (!data || data.length === 0) return <div className='text-center'>No orders yet</div>

  return (
    <ScrollArea className='h-[70vh]'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-background',
              item.id === selectedId && 'bg-secondary'
            )}
          >
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                  <div className='font-semibold'>{item.creatorName}</div>
                  {/* {!item.read && <span className='flex h-2 w-2 rounded-full bg-blue-600' />} */}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    item.id === selectedId ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {format(new Date(item.date), 'PPpp')}
                </div>
              </div>
              <div className='text-xs font-medium'>
                Offer: <span className='font-bold text-red-500'>{item.price} $</span>
              </div>
              <div className='text-xs font-medium'>
                Status:{' '}
                <span
                  className={cn('font-bold', {
                    'text-orange-500': item.status === PreOrderStatus.PENDING,
                    'text-red-500': item.status === PreOrderStatus.REJECTED,
                    'text-green-500': item.status === PreOrderStatus.ACCEPTED
                  })}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className='line-clamp-2 text-xs text-muted-foreground'>{(item.message || '').substring(0, 300)}</div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

export default OrderList
