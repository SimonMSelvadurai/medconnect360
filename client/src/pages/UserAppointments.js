import { QUERY_ALL_BOOKINGS_BY_USER } from "../gql/queries";
import { REMOVE_BOOKING } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { useParams, useHistory, Link } from "react-router-dom";

import * as moment from "moment";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
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
  TableFooter,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  color: "teal",
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

function UserAppointments(props) {
  console.log("--- PROPS --- : ", props);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const userId = Auth.getUserId();
  const history = useHistory();

  const { loading, data } = useQuery(QUERY_ALL_BOOKINGS_BY_USER, {
    variables: { userId: userId },
  });

  const [removeBooking] = useMutation(REMOVE_BOOKING, {
    onError: (error) => console.error("Error creating a post", error),
    onCompleted: () => {
      console.log("onCompleted() : Data from mutation", data);
      console.log("onCompleted() : mutationResponse : Data from mutation");
      history.push({ pathname: "/cancelSuccess", state: data });

      window.location.reload();
    },
  });

  console.log("USER APPT LIST data ___>", data);
  const userApptsList = data?.userBookings || {};
  console.log("USER APPT LIST  ___>", userApptsList);

  console.log("userBookings role", Auth.getRole());

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemoveBooking = async (bookingId) => {
    console.log("handleRemoveBooking : ", bookingId);

    try {
      let result = await removeBooking({
        variables: {
          bookingId: bookingId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateBooking = async (row) => {
    console.log("handleUpdateBooking : Booking ID is :  ", row.bookingId);

    // try {
    //   let result = await removeBooking({
    //     variables: {
    //       bookingId: bookingId,
    //     },
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  //  const doctors = data?.doctors || {};
  // console.log("doctors",doctors);

  let Appointments = [],
    STATUSES = ["Booked", "Cancelled", "Completed"];
  for (let i = 0; i < userApptsList.length; i++) {
    Appointments[i] = {
      doctorId: userApptsList[i].doctorId,
      doctorName: userApptsList[i].doctorName,
      clinicName: userApptsList[i].clinicName,
      bookingId: userApptsList[i]._id,
      patientName: userApptsList[i].patientName,
      patientEmail: userApptsList[i].patientEmail,
      patientContactNumber: userApptsList[i].patientContactNumber,
      patientDOB: userApptsList[i].patientDOB,
      apptDateTime: moment(userApptsList[i].apptDateTime).format("LL"),

      // status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
      status: "Active",
    };
  }
  console.log(Appointments);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>
              Patient's Details
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Doctor's Details
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Appointment Details
            </TableCell>
            {/* <TableCell className={classes.tableHeaderCell}>Status</TableCell> */}
            <TableCell className={classes.tableHeaderCell}>
              Edit Booking
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Cancel Booking
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Appointments.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          ).map((row) => (
            <TableRow key={row.bookingId}>
              <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar
                      alt={row.patientName}
                      src="."
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>
                      {row.patientName}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.patientEmail}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.patientContactNumber}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.patientDOB}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography className={classes.name}>
                  Dr.{row.doctorName}
                </Typography>
                <Typography color="primary" variant="subtitle2">
                  {row.clinicName}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {row.clinicAddress}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.color}>
                  {row.apptDateTime}
                </Typography>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    history.push({ pathname: "/editBooking", state: row });
                  }}
                >
                  <span role="img" aria-label="send">
                    ✅
                  </span>
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    handleRemoveBooking(row.bookingId);
                  }}
                >
                  <span role="img" aria-label="delete">
                    ✖️
                  </span>
                </button>
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

export default UserAppointments;
