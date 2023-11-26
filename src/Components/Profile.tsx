import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    tableCellClasses,
    TablePagination
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import Button from "@mui/material/Button";

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

export default function Profile(props: any) {
    const [userList, setUserList] = useState([]);


   const getUserData = () => {
       axios.get(`https://json-server-e275a-default-rtdb.firebaseio.com/userData.json`).then((res: any) => {
           if (res.data) {
               const ar: any = Object.values(res.data).filter((r: any) => r.name == props.name)
               setUserList(ar);
           }
       }).then((res: any) => {
           // setOpenBackDrop(false);
       });
   }

    useEffect(() => {
        getUserData();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

  return (
    <>
    <TableContainer component={Paper} style={{
      minWidth: 'fitContent',
    }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >Date</StyledTableCell>
                            <StyledTableCell>Wake Up</StyledTableCell>
                            <StyledTableCell>Chanting</StyledTableCell>
                            <StyledTableCell>Mangala aarati</StyledTableCell>
                            <StyledTableCell>Reading</StyledTableCell>
                            <StyledTableCell>Hearing</StyledTableCell>
                            <StyledTableCell>Speaker</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => (
                            <StyledTableRow key={index} >
                                <StyledTableCell >{row.date}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.wakeUpTime}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.chanting}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.mangla_aarati}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.reading}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.hearing}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.speaker}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Object.keys(userList).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
  )
}
