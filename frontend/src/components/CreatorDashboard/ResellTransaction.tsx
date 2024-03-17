import { useQuery } from 'react-query'
import useAuth from '~/hooks/useAuth'
import { ResellStatus, ResponseObj } from '~/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Spinner from '../common/Spinner'
import { cn } from '~/lib/utils'

type Resell = {
  id: number
  artTitle: string
  artId: number
  sellerUsername: string
  sellerId: number
  buyerUsername: string
  buyerId: number
  date: string
  amount: number
  status: ResellStatus
  message: string
}

const fetchResellRequest = async (userId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/resell-transaction/${userId}`)
  const data = (await res.json()) as ResponseObj<Resell[]>
  return data.data
}
const ResellTransaction = () => {
  const { user } = useAuth()
  const { isFetching, isError, data } = useQuery<Resell[], Error>(['resell-transaction', user?.id], () =>
    fetchResellRequest(user?.id || 0)
  )

  if (isError) {
    return <div>Failed to fetch purchased history</div>
  }

  if (isFetching) return <Spinner />
  if (!data || data.length === 0) return null

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Art</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>From/To</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-right'>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.id}</TableCell>
            <TableCell className='font-semibold text-blue-500'>{item.artTitle}</TableCell>
            <TableCell className='font-semibold'>{item.buyerId === user?.id ? 'Buy' : 'Sell'}</TableCell>
            <TableCell className='font-semibold text-blue-500'>
              {item.buyerId === user?.id ? item.sellerUsername : item.buyerUsername}
            </TableCell>
            <TableCell
              className={cn('font-semibold', {
                'text-orange-500': item.status === ResellStatus.PENDING,
                'text-red-500': item.status === ResellStatus.REJECTED,
                'text-green-500': item.status === ResellStatus.ACCEPTED
              })}
            >
              {item.status}
            </TableCell>
            <TableCell className='text-right font-semibold text-red-500'>${item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ResellTransaction
