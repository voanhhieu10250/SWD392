import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

interface TransactionData {
  id: number
  partner: string
  date: string
  image: string
  type: 'Buy' | 'Sell'
  price: number
}
const transactions: TransactionData[] = [
  {
    id: 1,
    partner: 'Alice',
    date: '01/01/2023',
    image: 'https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-cute.jpg',
    type: 'Buy',
    price: 100
  },
  { id: 2, partner: 'Bob', date: '02/01/2023', image: 'Image2.jpg', type: 'Sell', price: 150 }
  // Thêm các giao dịch khác ở đây
]
const TransactionHistory: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Partner</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.partner}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <img
                  src={transaction.image}
                  alt={transaction.partner}
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>${transaction.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionHistory
