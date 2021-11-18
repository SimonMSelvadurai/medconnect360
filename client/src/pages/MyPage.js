import { QUERY_ALL_DOCTOR_NAMES, QUERY_ALL_APPOINTMENTS_DOCTOR } from '../gql/queries';
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import * as moment from 'moment';
import { useQuery } from '@apollo/client';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    color :'teal',
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

function MyPage() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  console.log("<========= useParams ========= > ", useParams());

  // console.log("<========= DoctorID ========= > ", doctorId);

  var userId = Auth.getUserId();
  console.log("Doctor's ID from the Local Storage : ", userId);
  const { loading, data } = useQuery(QUERY_ALL_APPOINTMENTS_DOCTOR, {
    variables: { doctorId: userId },
  });

  const drApptsList = data?.doctorAppointments || {};
  console.log("DrAPTLIST ___>", drApptsList);

  console.log("userBookings role", Auth.getRole());

  const appointments=[];



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  //  const doctors = data?.doctors || {};
  // console.log("doctors",doctors);

let Appointments = [], STATUSES = ['Booked', 'Cancelled', 'Completed'];
for(let i=0;i<drApptsList.length;i++) {
  Appointments[i] = {
    doctorId :drApptsList[i].doctorId,
    doctorName :drApptsList[i].doctorName,
    clinicName: drApptsList[i].clinicName,
    bookingId :drApptsList[i].bookingId,

    patientName: drApptsList[i].patientName,
    patientEmail: drApptsList[i].patientEmail,
        patientContactNumber: drApptsList[i].patientContactNumber,
        patientDOB: drApptsList[i].patientDOB,
        // apptDateTime: drApptsList[i].apptDateTime.moment().format('LLLL'),
        apptDateTime: moment(drApptsList[i].apptDateTime).format('LL'),

        // status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
        status:'Active',
    }
}
console.log(Appointments);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Patient's Details</TableCell>
            <TableCell className={classes.tableHeaderCell}>Doctor's Details</TableCell>
            <TableCell className={classes.tableHeaderCell}>Appointment Details</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            
            <TableRow key={row.patientName}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.patientName} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.patientName}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.patientEmail}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.patientContactNumber}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.patientDOB}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
              <Typography className={classes.name}>Dr.{row.doctorName}</Typography>
                  <Typography color="primary" variant="subtitle2">{row.clinicName}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.clinicAddress}</Typography>
                </TableCell>
                <TableCell>
                <Typography className={classes.color}>{row.apptDateTime}</Typography>
                  {/* <Typography color="primary" variant="subtitle2">{row.clinicName}</Typography> */}
                  {/* <Typography color="textSecondary" variant="body2">{row.clinicAddress}</Typography> */}
                </TableCell>
              {/* // <TableCell>{row.clinicAddress}</TableCell> */}
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' && 'green') ||
                        (row.status === 'Pending' && 'blue') ||
                        (row.status === 'Blocked' && 'orange'))
                    }}
                  >{row.status}</Typography>

                  <Typography >
       



                {/* <button onClick = {()=>window.location.href = `http://localhost:3000/booking/617a0b73d7911554c8e3655c`} >Book Appointment</button> */}

                {/* <button onClick = {(e)=>{ history.push(`/booking/617a0b73d7911554c8e3655c`)}}>  Submit       </button> */}
                {/* <Link
                className="btn btn-block btn-squared btn-light text-dark"
                to={`/booking/${row.docId}`}>
                Book Appointment
              </Link> */}
                {/* <button onClick = {(e)=>{ history.push()}}> */}
                  </Typography>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={Appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MyPage;
