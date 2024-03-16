import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import Paper from '@mui/material/Paper'

import IconButton from '@mui/material/IconButton'

import { visuallyHidden } from '@mui/utils'
import { Switch } from '@mui/material'
import { useNavigate } from 'react-router'

interface Data {
  id: number
  offer: number
  description: string
  name: string
  status: boolean
}

function createData(id: number, name: string, offer: number, description: string, status: boolean): Data {
  return {
    id,
    name,
    offer,
    description,
    status
  }
}

const rows = [
  createData(1, 'Cupcake', 305, 'description', false),
  createData(2, 'Donut', 452, 'hom nay la thu 4', true),
  createData(3, 'Eclair', 262, 'Hom nay la thu 5', false),
  createData(4, 'Frozen yoghurt', 159, '6', false),
  createData(5, 'Gingerbread', 356, ' 16.0', false),
  createData(6, 'Honeycomb', 408, '3.2', false),
  createData(7, 'Ice cream sandwich', 237, ' 9.0', true),
  createData(8, 'Jelly Bean', 375, '0.0', true),
  createData(9, 'KitKat', 518, '26.0', true),
  createData(10, 'Lollipop', 392, '0.2', false),
  createData(11, 'Marshmallow', 318, '0', true),
  createData(12, 'Nougat', 360, '423', true),
  createData(13, 'Oreo', 437, '18.0', true)
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'User Name'
  },
  {
    id: 'offer',
    numeric: true,
    label: 'Price (€)'
  },

  {
    id: 'description',
    numeric: true,
    label: 'Description'
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status'
  },
  {
    id: 'detail',
    numeric: true,
    label: 'Detail'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ pl: headCell.id === 'name' ? 3 : 0 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function DataTable({ onDetailClick }) {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('offer')

  const [page, setPage] = React.useState(0)

  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
  //   const newRows = rows.map((row) => {
  //     if (row.id === id) {
  //       return { ...row, status: event.target.checked }
  //     }
  //     return row
  //   })
  //   setRows(newRows)
  // }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  )
  const navigate = useNavigate()
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow hover key={row.id}>
                    <TableCell component='th' id={labelId} scope='row' sx={{ pl: 3 }}>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.offer}</TableCell>

                    <TableCell align='right'>{row.description}</TableCell>
                    <TableCell align='right'>
                      <Switch checked={!!row.status} onChange={(event) => handleStatusChange(event, row.id)} />
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton onClick={() => onDetailClick(row)}>...</IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
