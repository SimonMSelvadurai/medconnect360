import React, { useState } from "react";
import { Container } from "../components/Container";
import { H2 } from "../components/Text";
import { useQuery } from "@apollo/client";
import { ADD_BOOKING } from "../gql/mutations";
import { QUERY_DOCTOR_BY_ID } from "../gql/queries";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../components/Button";
import moment from "moment";
import "react-datetime-picker/dist/DateTimePicker.css";
import DateTimePicker from "react-datetime-picker";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
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
  TableFooter,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

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

function Booking(props) {
  const [dt, setDt] = useState(moment());
  const [addBooking] = useMutation(ADD_BOOKING);
  const { doctorId } = useParams();
  console.log("<========= DoctorID ========= > ", doctorId);
  //Load Doctor
  const { loading, data } = useQuery(QUERY_DOCTOR_BY_ID, {
    // pass URL parameter
    variables: { _id: doctorId },
  });

  const doctor = data?.doctor || {};
  const [formState, setFormState] = useState({
    email: "",
    apptDate: "",
    fullName: "",
    contactNumber: "",
    description: "",
    isTeleHealth: "",
    clinicName: "",
  });

  console.log(doctorId);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addBooking({
      variables: {
        doctorId: doctorId,
        userId: "6174bf41b102a16e34655c36",
        email: formState.email,
        //password: formState.password,
        // dob: formState.dob,
        //password: formState.password,
        fullName: formState.fullName,
        contactNumber: formState.contactNumber,
        apptDate: formState.apptDate,
        description: formState.description,
        isTeleHealth: "false",
        clinicName: formState.clinicName,
      },
    });
    console.log("{{{{{{{{{{{mutationResponse}}}}}}}}}", mutationResponse);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Container>
        <H2>AddBooking</H2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="fullName">Full Name:</label> */}
            <input
              placeholder="Full Name"
              name="fullName"
              type="fullName"
              id="fullName"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="email">Email:</label> */}
            <input
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="contactNumber">ContactNumber:</label> */}
            <input
              placeholder="Contact Number"
              name="contactNumber"
              type="contactNumber"
              id="contactNumber"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="dob">Date of birth:</label> */}
            <input
              placeholder="Date of birth"
              name="dob"
              type="dob"
              id="dob"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="apptDate">Appointment Date:</label> */}
            <input
              placeholder="Appointment Date"
              name="apptDate"
              type="apptDate"
              id="apptDate"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="description">Description</label> */}
            <input
              placeholder="Description"
              name="description"
              type="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="clinicName">Clinic Name:</label> */}
            <input
              placeholder="Clinic Name"
              name="clinicName"
              type="clinicName"
              id="clinicName"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="clinicAddress">clinicAddress:</label> */}
            <input
              placeholder="Clinic Address"
              name="clinicAddress"
              type="clinicAddress"
              id="clinicAddress"
              onChange={handleChange}
            />
          </div>
          <div>
            <DateTimePicker
              inputProps={{
                style: { width: 250 },
              }}
              value={dt}
              dateFormat="DD-MM-YYYY"
              timeFormat="hh:mm"
              onChange={(val) => setDt(val)}
            />
          </div>
          <div className="flex-row flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Booking;
