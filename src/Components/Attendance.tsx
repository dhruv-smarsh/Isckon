import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormikValues, FormikHelpers } from 'formik/dist/types';
import axios from 'axios';

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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function Attendance() {

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState("");
    const [userList, setUserList] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenUser = () => {
        axios.post('http://localhost:3004/user', {
            name: inputValue,
            data: []
        }, {
        }).then((res: any) => {
            setInputValue("")
            getUser();
        })
    };

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios.get(`http://localhost:3004/user`).then((res: any) => {
            if (res.data) {
                setUserList(res.data);
            }
        });
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Add</Button>
            <TextField id="outlined-basic" label="Date" variant="outlined" value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <Button variant="contained" onClick={handleClickOpenUser}>Add User</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Reading</StyledTableCell>
                            <StyledTableCell align="right">Hearing</StyledTableCell>
                            <StyledTableCell align="right">Chanting</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((row: any, index) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell >{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Record"}
                </DialogTitle>
                <DialogContent>
                    <Formik initialValues={{
                        name: '',
                        date: '',
                        chanting: '',
                        reading: '',
                        hearing: '',
                    }} onSubmit={values => {
                        let userData: any;
                        axios.get(`http://localhost:3004/user/${values.name}`).then((res: any) => {
                            if (res.data) {
                                userData = res.data
                            }
                        }).then((res: any) => {
                            let a = userData.data.push(
                                {chanting: values.chanting, reading: values.reading, hearing: values.hearing}
                            )
                            axios.put(`http://localhost:3004/user/${values.name}`, {
                                ...userData,
                                data: 
                                    userData.data,
                                
                            }, {
                            }).then((res: any) => {
                                setOpen(false)
                            })
                        });
                       

                    }}>
                        {({
                            values,
                            handleChange,
                            handleSubmit
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}>
                                    {/* <TextField id="outlined-basic" label="Name" name='name' onChange={handleChange} value={values.name} variant="outlined" /> */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.name}
                                            name='name'
                                            label="Name"
                                            onChange={handleChange}
                                        >
                                            {userList.map((row: any, index) => (
                                                <MenuItem value={row.id}>{row.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField id="outlined-basic1" label="Date" name='date' onChange={handleChange} value={values.date} variant="outlined" />
                                    <TextField id="outlined-basic2" label="Chanting" name='chanting' onChange={handleChange} value={values.chanting} variant="outlined" />
                                    <TextField id="outlined-basic3" label="Reading" name='reading' onChange={handleChange} value={values.reading} variant="outlined" />
                                    <TextField id="outlined-basic4" label="Hearing" name='hearing' onChange={handleChange} value={values.hearing} variant="outlined" />
                                </Box>
                                <DialogActions>
                                    <Button onClick={handleClose}>Disagree</Button>
                                    <Button type='submit' autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}
