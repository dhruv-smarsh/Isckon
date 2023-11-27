import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    styled,
    tableCellClasses,
    TablePagination
} from '@mui/material';
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
    const [isEdit, setIsEdit] = React.useState(false);
    const [inputValue, setInputValue] = useState("");
    const [id, setId] = useState("");
    const [userList, setUserList] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

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
                    name: inputValue,
                    data: []
                })
            }
        ).then((res: any) => {
            setInputValue("")
            getUser();
        })
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
                    <Button disabled={!inputValue} variant="contained" onClick={handleClickOpenUser}>Add User</Button>
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
                        {Object.values(userList).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => (
                            <StyledTableRow key={row.name} >
                                <StyledTableCell >{(page * rowsPerPage) + index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{
                                    display: 'flex',
                                    justifyContent: 'spaceEvenly'
                                }}>
                                    <Button sx={{
                                        marginRight: '10px'
                                    }} variant="contained" onClick={() => handleClickOpen(row.name)}>Add</Button>
                                    <Button variant="contained" onClick={() => (setProfileData(true), setIsEdit(row.name))}>View</Button>
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
                        wakeUpTime: '',
                        mangla_aarati: '',
                        speaker: ''
                    }} onSubmit={values => {
                        setOpenBackDrop(true)
                        fetch(
                            "https://json-server-e275a-default-rtdb.firebaseio.com/userData.json",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    chanting: values.chanting,
                                    hearing: values.hearing,
                                    name: values.name,
                                    reading: values.reading,
                                    date: values.date,
                                    wakeUpTime: values.wakeUpTime,
                                    mangla_aarati: values.mangla_aarati,
                                    speaker: values.speaker
                                })
                            }
                        ).then((res: any) => {
                            setOpenBackDrop(false)
                            setOpen(false)
                        })


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
                                            {Object.values(userList).map((row: any, index) => (
                                                <MenuItem key={index} value={row.name}>{row.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField id="outlined-basic1" label="Date" type='date' name='date' onChange={handleChange} value={values.date} variant="outlined" />
                                    <TextField id="outlined-basic5" label="wakeUpTime" type='time' name='wakeUpTime' onChange={handleChange} value={values.wakeUpTime} variant="outlined" />
                                    <TextField id="outlined-basic2" label="Chanting" type='number' name='chanting' onChange={handleChange} value={values.chanting} variant="outlined" />
                                    <TextField id="outlined-basic3" label="Reading" name='reading' onChange={handleChange} value={values.reading} variant="outlined" />
                                    <TextField id="outlined-basic7" label="Speaker" name='speaker' onChange={handleChange} value={values.speaker} variant="outlined" />
                                    <TextField id="outlined-basic4" label="Hearing" name='hearing' onChange={handleChange} value={values.hearing} variant="outlined" />
                                    <TextField id="outlined-basic6" label="Mangala aarati" name='mangla_aarati' onChange={handleChange} value={values.mangla_aarati} variant="outlined" />
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
                    <Profile name={isEdit}/>
                </DialogContent>
                <DialogActions>
                                    <Button onClick={() => setProfileData(false)}>Close</Button>
                                </DialogActions>
            </Dialog>
        </>
    )
}
