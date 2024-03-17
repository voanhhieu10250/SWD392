import { format } from 'date-fns'
import { useQuery } from 'react-query'
import Spinner from '~/components/common/Spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import useAuth from '~/hooks/useAuth'
import { ResponseObj } from '~/types'

interface Package {
  id: number
  packageName: string
  date: string
  price: number
}
const fetchPurchasedHistory = async (userId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/package-purchased/${userId}`)
  const data = (await res.json()) as ResponseObj<Package[]>
  return data.data
}
function HistoryBuyPackage() {
  const { user } = useAuth()
  const { isFetching, isError, data } = useQuery<Package[], Error>(['package-purchased', user?.id], () =>
    fetchPurchasedHistory(user?.id || 0)
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
          <TableHead>Package Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className='text-right'>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.id}</TableCell>
            <TableCell className='font-semibold text-blue-500'>{item.packageName}</TableCell>
            <TableCell className='font-semibold'>{format(item.date, 'MMM d, yyyy')}</TableCell>
            <TableCell className='text-right font-semibold text-red-500'>${item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default HistoryBuyPackage
