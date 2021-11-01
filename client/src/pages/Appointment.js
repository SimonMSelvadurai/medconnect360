import React from "react";
import { useQuery } from '@apollo/client';
import { Container } from "../components/Container";
import { H2 } from "../components/Text";
import { QUERY_ALL_DOCTOR_NAMES,QUERY_ALL_BOOKINGS_BY_USER_ID } from '../gql/queries';
import DoctorList from '../components/DoctorList';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

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
const Appointment = () => {
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  // const doctors = data?.doctors || {};
  // console.log("doctors",doctors);

  // const { loading, data } = useQuery(QUERY_ALL_BOOKINGS_BY_USER_ID);
  // const appointments = data?.appointments || {};
  // console.log("appointments",appointments);
  // console.log("userBookings", data.userBookings)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { loading, data } = useQuery(QUERY_ALL_BOOKINGS_BY_USER_ID);
  const userBookings = data?.userBookings || {};
  console.log("data", data);
  console.log("bookings", userBookings);

  let APPOINTMETS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
  for(let i=0;i<userBookings.length;i++) {
    APPOINTMETS[i] = {

          docId :userBookings[i].doctorId,
          patientName: userBookings[i].patientName,
          contactNumber:userBookings[i].contactNumber,
          email:userBookings[i].email,
          userId:userBookings[i].userId,
          apptDateTime:userBookings[i].apptDateTime,
          // email: userBookings[i].email,
          // contactNumber: userBookings[i].contactNumber,
          // specialization: userBookings[i].specialization,
          // clinicAddress: userBookings[i].clinicAddress,
          // clinicName: userBookings[i].clinicName,
          // status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
          status:'Cancel',
      }
  }
  console.log(APPOINTMETS);


  // return (
  //   <main>
  //     <div className="flex-row justify-center">
  //       <div className="col-12 col-md-10 my-3">
  //         {loading ? (
  //           <div>Loading...</div>
  //         ) : (
  //           <DoctorList
  //             doctors={doctors}
  //             title= "Here's the List of Doctors Please Proceed with Appointments..."
  //           />
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // );


  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Patient's Detail </TableCell>
            <TableCell className={classes.tableHeaderCell}>Doctor Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Clinic Details</TableCell>
            {/* <TableCell className={classes.tableHeaderCell}>Cancel Booking</TableCell> */}
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {APPOINTMETS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            
            <TableRow key={row.patientName}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.patientName} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.patientName}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.userId}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.contactNumber}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.docId}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.apptDateTime}</Typography>
                </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
             
             
  
 
             
             
             {/* <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' ||'Cancel' && 'green') ||
                        (row.status === 'Pending' && 'blue') ||
                        (row.status === 'Blocked' && 'orange'))
                    }}
                  >{row.status}</Typography> */}

                  <Typography className={classes.status}
                      style={{
                        backgroundColor: 
                        ((row.status === 'Active' ||'Cancel' && 'green') ||
                        (row.status === 'Pending' && 'blue') ||
                        (row.status === 'Blocked' && 'orange'))
                    }}>
       
                  <Button variant="contained" onclick="cancelRecord()">Cancel</Button>    


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
            count={APPOINTMETS.length}
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
export default Appointment;
