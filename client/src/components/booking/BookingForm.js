import React, { useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { alpha } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { dateFormat, dbDateFormat , dobFormat} from "../../utils/DateUtils";

import InputLabel from "@mui/material/InputLabel";
// import MenuItem from '@mui/material/MenuItem';
import MenuItem from "@material-ui/core/MenuItem";

// import FormControl from '@mui/material/FormControl';
import FormControl from "@material-ui/core/FormControl";
// import Select from '@mui/material/Select';
import Select from "@material-ui/core/Select";

import { QUERY_ALL_DOCTOR_NAMES } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { isValid, parseISO, parse } from "date-fns";
import { ADD_BOOKING, BOOK_USER, ADD_USER } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import Booking from "../../pages/Booking";

const containerStyle = {
  zIndex: 10,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // backgroundColor: "rgba(204, 204, 204)",
  backgroundColor: "#d5f5f8",
  padding: "0em 1em 1em",
  color: "#111111",
  borderRadius: "1em",
  boxShadow: "#000000 3px 3px 4px 1px",
  border: "1px #000000 solid",
};

const formTitleStyle = {
  fontWeight: "bold",
};

export default (props) => {
  console.log("props received-------------", props);

  const [selectedPatientDOB, handlePatientDOBChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.patientDOB : null
  );
  const [selectedApptDateTime, handleApptDateTimeChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.apptDateTime : null
  );
  const [isDisabled, setDisabled] = useState(true);
  const frmTitle = useRef(null);

  const [doctorName, setDoctorName] = useState(
    props.hasSelectedEvent ? props.selectedEvent.doctorName : null
    //doctorName: ""
  );

  const [addBooking] = useMutation(ADD_BOOKING);
  const [bookUser] = useMutation(BOOK_USER);
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    setDoctorName(event.target.value);
  };

  //Load Doctors
  const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  const doctors = data?.doctors || {};

  const handleEsc = (evt) => {
    if (evt.keyCode === 27) {
      window.removeEventListener("keydown", handleEsc);
      props.onFormCancel();
    }
  };
  window.addEventListener("keydown", handleEsc);
  const [formState, setFormState] = useState({
    patientDOB: "",
    apptDateTime: "",
    patientName: "",
    patientEmail: "",
    patientContactNumber: "",
    doctorName: "",
  });

  const handleSubmit = () => {
    var patientDOBVal = new Date(document.getElementById("patientDOB").value);
    var apptDateTimeVal = new Date(document.getElementById("apptDateTime").value);
    var patientNameVal = document.getElementById("patientName").value;
    var patientEmailVal = document.getElementById("patientEmail").value;
    var patientContactNumberVal = document.getElementById("patientContactNumber").value;

    const bookingId = props.hasSelectedEvent ? props.selectedEvent.uid : crypto.randomUUID();
     
    console.log("bookResponsebookingId ", bookingId);

    book(
      bookingId,
      patientDOBVal,
      patientEmailVal,
      patientNameVal,
      patientContactNumberVal,
      apptDateTimeVal
    );
   
    const newEvent = {
      patientDOB: patientDOBVal,
      apptDateTime: apptDateTimeVal,
      patientName: patientNameVal,
      patientEmail: patientEmailVal,
      patientContactNumber: patientContactNumberVal,
      doctorName: doctorName,
      // uid: props.hasSelectedEvent ? props.selectedEvent.uid : +new Date(),
      uid: bookingId,
    };
    props.onFormSubmit(newEvent);
  };

  async function book(
    bookingId,
    patientDOBVal,
    patientEmailVal,
    patientNameVal,
    patientContactNumberVal,
    apptDateTimeVal
  ) {
   
    doctors &&
      doctors.map((doctor) => {
        if (doctor.fullName === doctorName) {
          console.log("Dr found.....", doctor);
          const doctorId = doctor._id;
          const doctorName = doctor.fullName;
         
          return newBooking(
            bookingId,
            doctorId,
            doctorName,
            apptDateTimeVal,
            patientEmailVal,
            patientDOBVal,
            patientNameVal,
            patientContactNumberVal
          );
        }
      });
  }

  async function newBooking(
    bookingId,
    doctorId,
    doctorName,
    apptDateTimeVal,
    patientEmailVal,
    patientDOBVal,
    patientNameVal,
    patientContactNumberVal
  ) {
    try
    {
    let result = await addBooking({
      variables: {
        bookingId: bookingId,
        patientEmail: patientEmailVal,
        patientDOB: patientDOBVal,
        patientName: patientNameVal,
        patientContactNumber: patientContactNumberVal,
        doctorId: doctorId,
        doctorName: doctorName,
        apptDateTime: apptDateTimeVal,
      },
    });

    return result;
  } catch (e) {
    console.log(e);
  }
  }

  const handleTextChange = () => {
 
    setDisabled(
      document.getElementById("patientDOB").value === "" ||
        document.getElementById("apptDateTime").value === "" ||
        document.getElementById("patientName").value === "" ||
        document.getElementById("patientEmail").value === "" ||
        document.getElementById("patientContactNumber").value === "" ||
        document.getElementById("listDoctor").value === ""
    );
  };

  let DOCTORS = [],
    STATUSES = ["Active", "Pending", "Blocked"];
  for (let i = 0; i < doctors.length; i++) {
    DOCTORS[i] = {
      docId: doctors[i]._id,
      fullName: doctors[i].fullName,
      email: doctors[i].email,
      contactNumber: doctors[i].contactNumber,
      specialization: doctors[i].specialization,
      clinicAddress: doctors[i].clinicAddress,
      clinicName: doctors[i].clinicName,
      doctorName: doctors[i].doctorName,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    };
  }
  console.log(DOCTORS);

  const inputStyle = {
    //minWidth: "14em"
    minWidth: "40em",
  };

  return (
    <div style={containerStyle} id="appointmentform">
      <h3 style={formTitleStyle}>{props.formTitle}</h3>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id="patientDOB_formatted"
          label="Date Of Birth"
          value={selectedPatientDOB}
          onChange={(dt) => {
            handlePatientDOBChange(dt);
            handleTextChange();
          }}
          format={dobFormat}
          style={inputStyle}
        />
        <DateTimePicker
          id="apptDateTime_formatted"
          label="Appointment Date"
          value={selectedApptDateTime}
          onChange={(dt) => {
            handleApptDateTimeChange(dt);
            handleTextChange();
          }}
          format={dateFormat}
          style={inputStyle}
        />
      </MuiPickersUtilsProvider>
      <input
        defaultValue={selectedPatientDOB === null ? "" : selectedPatientDOB}
        id="patientDOB"
        type="hidden"
      />
      <input
        defaultValue={selectedApptDateTime === null ? "" : selectedApptDateTime}
        id="apptDateTime"
        type="hidden"
      />
      <TextField
        id="patientName"
        label="Patient Full Name"
        onChange={handleTextChange}
        style={inputStyle}
        inputRef={frmTitle}
        defaultValue={props.hasSelectedEvent ? props.selectedEvent.patientName : null}
      />
      <TextField
        id="patientEmail"
        label="EMail Address"
        onChange={handleTextChange}
        style={inputStyle}
        defaultValue={
          props.hasSelectedEvent ? props.selectedEvent.patientEmail : null
        }
      />
      <TextField
        id="patientContactNumber"
        label="Contact Number"
        onChange={handleTextChange}
        style={inputStyle}
        defaultValue={
          props.hasSelectedEvent ? props.selectedEvent.patientContactNumber : null
        }
      />

      <>
        {/* <FormControl>
        <InputLabel id="event_doctorName">Doctor's List</InputLabel>
        <Select labelId="listDoctor" id="listDoctor" value="" onChange={handleChange}>
          {DOCTORS.slice().map((doctor, index) => (
            <MenuItem key={index} value={event_doctorName}>
              {doctor.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

        <FormControl>
          <InputLabel id="listDoctor">Doctor's List</InputLabel>
          <Select
            labelId="listDoctor"
            id="event_doctorName"
            value={doctorName}
            onChange={handleChange}
            defaultValue={
              props.hasSelectedEvent ? props.selectedEvent.doctorName : null
            }
          >
            {DOCTORS.map((doctor, index) => (
              // <MenuItem key={index} value= {doctor.fullName}>

              // <MenuItem key={index} value={doctor.fullName} onClick={(e) => clicked(e, doctor)}>
              <MenuItem key={index} value={doctor.fullName}>
                Dr.{doctor.fullName}
                {/* <input type="hidden" name= "docId" id="docId" value={doctor.docId} /> */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>

      <div style={{ marginTop: "2em", minWidth: "12em" }}>
        <Button
          variant="contained"
          onClick={props.onFormCancel}
          style={{ marginRight: "1em" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          id="formSubmit"
          disabled={isDisabled}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
