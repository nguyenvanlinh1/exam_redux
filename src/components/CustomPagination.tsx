import { Pagination } from '@mui/material'

interface IPagination {
    count: number,
}

export const CustomPagination = ({count}: IPagination) => {
  return (
    <Pagination count={count} color="primary"/>
  )
}
