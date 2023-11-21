import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Backdrop, Box, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, tableCellClasses } from '@mui/material';
import { Form, Formik } from 'formik';
import { FormikValues, FormikHelpers } from 'formik/dist/types';
import axios from 'axios';
import Profile from './Profile';

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
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [profileData, setProfileData] = React.useState(false);
    const [inputValue, setInputValue] = useState("");
    const [id, setId] = useState("");
    const [userList, setUserList] = useState([]);

    const handleClickOpen = (id?: any) => {
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenUser = () => {
        setOpenBackDrop(true)
        fetch(
            "https://json-server-e275a-default-rtdb.firebaseio.com/user.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: inputValue
                })
            }
        )
        // axios.post('https://json-server-e275a-default-rtdb.firebaseio.com/user.json', {
        //     name: inputValue,
        //     data: []
        // }, {
        // }).then((res: any) => {
        //     debugger
        //     setInputValue("")
        //     getUser();
        // })
    };

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setOpenBackDrop(true)
        axios.get(`https://json-server-e275a-default-rtdb.firebaseio.com/user.json`).then((res: any) => {
            if (res.data) {
                setUserList(res.data);
            }
        }).then((res: any) => {
            setOpenBackDrop(false);
        });
    }

    return (
        <>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Grid item >
                    <TextField id="outlined-basic" label="User" variant="outlined" value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={handleClickOpenUser}>Add User</Button>
                </Grid>
            </Grid>


            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Sr. No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(userList).map((row: any, index) => (
                            <StyledTableRow key={row.name} >
                                <StyledTableCell >{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right" >
                                    <Button sx={{
                                        marginRight: '10px'
                                    }} variant="contained" onClick={() => handleClickOpen(row.id)}>Add</Button>
                                    <Button variant="contained" onClick={() => setProfileData(true)}>View</Button>
                                    </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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
                        name: id,
                        date: '',
                        chanting: '',
                        reading: '',
                        hearing: '',
                    }} onSubmit={values => {
                        setOpenBackDrop(true)
                        let userData: any;
                        debugger
                        axios.post(`https://json-server-e275a-default-rtdb.firebaseio.com/user.json`).then((res: any)  => {
                            debugger
                            console.log(res)
                        })
                        // axios.get(`https://localhost:5000/user/${values.name}`).then((res: any) => {
                        //     if (res.data) {
                        //         userData = res.data
                        //     }
                        // }).then((res: any) => {
                        //     let a = userData.data.push(
                        //         { chanting: values.chanting, reading: values.reading, hearing: values.hearing }
                        //     )
                        //     axios.put(`https://localhost:5000/user/${values.name}`, {
                        //         ...userData,
                        //         data:
                        //             userData.data,

                        //     }, {
                        //     }).then((res: any) => {
                        //         setOpen(false)
                        //         setOpenBackDrop(false)
                        //     })
                        // });


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
                                            defaultValue={id}
                                        >
                                            {userList.map((row: any, index) => (
                                                <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField id="outlined-basic1" label="Date" type='date' name='date' onChange={handleChange} value={values.date} variant="outlined" />
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


            <Dialog
                open={profileData}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
               
                <DialogContent>
                    <Profile/>
                </DialogContent>
                <DialogActions>
                                    <Button onClick={() => setProfileData(false)}>Close</Button>
                                </DialogActions>
            </Dialog>
        </>
    )
}
