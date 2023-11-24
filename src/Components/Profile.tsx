import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
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

                        {userList.map((row: any, index) => (
                            <StyledTableRow key={index} >
                                <StyledTableCell >{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                {/*<StyledTableCell align="right" >*/}
                                {/*    <Button sx={{*/}
                                {/*        marginRight: '10px'*/}
                                {/*    }} variant="contained" onClick={() => handleClickOpen(row.name)}>Add</Button>*/}
                                {/*    <Button variant="contained" onClick={() => setProfileData(true)}>View</Button>*/}
                                {/*</StyledTableCell>*/}
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
    </>
  )
}
