import React from 'react'
import { Pagination,PaginationItem } from '@mui/material'
import useStyles from './style'
import { Link } from 'react-router-dom'

function Pagination() {
  const classes = useStyles()
  return (
    <Pagination
     classes={{ul : classes.ul}}
     count = {5}
     page={1}
     variant='outlined'
     color='primary'
     renderItem={() => (
      <PaginationItem  component={Link} to={`/bikes?page=${1}`}/>
     ) }
    ></Pagination>
  )
}

export default Pagination