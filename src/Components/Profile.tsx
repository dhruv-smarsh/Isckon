import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#b84235',
      color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
      border: 0,
  },
}));

export default function Profile() {
  return (
    <>
    <TableContainer component={Paper} sx={{
      minWidth: '200px',
    }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Start Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            <StyledTableRow >
                                <StyledTableCell >1</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    name
                                </StyledTableCell>
                                <StyledTableCell align="right">calories</StyledTableCell>
                            </StyledTableRow>
                       
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  )
}
