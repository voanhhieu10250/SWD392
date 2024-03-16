import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material'

interface PackageData {
  id: number
  packageName: string
  purchaseDate: string
  status: 'Active' | 'Expired'
}
function createPackageData(
  id: number,
  packageName: string,
  purchaseDate: string,
  status: 'Active' | 'Expired'
): PackageData {
  return {
    id,
    packageName,
    purchaseDate,
    status
  }
}
const packageRows = [
  createPackageData(1, 'Basic Package', '01/01/2023', 'Active'),
  createPackageData(2, 'Premium Package', '15/02/2023', 'Expired')
  // Thêm dữ liệu mẫu tại đây
]
function HistoryBuyPackage() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - packageRows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Package Name</TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Purchase Date
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? packageRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : packageRows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.packageName}
                  </TableCell>
                  <TableCell align='right'>{row.purchaseDate}</TableCell>
                  <TableCell align='right'>{row.status}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={packageRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default HistoryBuyPackage
