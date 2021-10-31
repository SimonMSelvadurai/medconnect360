import React, { useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
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

  const [selectedDTStart, handleDTStartChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.dtstart : null
  );
  const [selectedDTEnd, handleDTEndChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.dtend : null
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
    dtstart: "",
    dtend: "",
    event_title: "",
    event_location: "",
    event_description: "",
    doctorName: "",
  });

  const handleSubmit = () => {
    var dtstartVal = new Date(document.getElementById("dtstart").value);
    var dtendVal = new Date(document.getElementById("dtend").value);
    var titleVal = document.getElementById("event_title").value;
    var locationVal = document.getElementById("event_location").value;
    var descriptionVal = document.getElementById("event_description").value;

    const bookingId = props.hasSelectedEvent ? props.selectedEvent.uid : crypto.randomUUID();
     
    console.log("bookResponsebookingId ", bookingId);

    book(
      bookingId,
      dtstartVal,
      locationVal,
      titleVal,
      descriptionVal,
      dtendVal
    );
   
    const newEvent = {
      dtstart: dtstartVal,
      dtend: dtendVal,
      title: titleVal,
      location: locationVal,
      description: descriptionVal,
      doctorName: doctorName,
      // uid: props.hasSelectedEvent ? props.selectedEvent.uid : +new Date(),
      uid: bookingId,
    };
    props.onFormSubmit(newEvent);
  };

  async function book(
    bookingId,
    dtstartVal,
    locationVal,
    titleVal,
    descriptionVal,
    dtendVal
  ) {
   
    doctors &&
      doctors.map((doctor) => {
        if (doctor.fullName === doctorName) {
          console.log("Dr found.....", doctor);
          const doctorId = doctor._id;
         
          return newBooking(
            bookingId,
            doctorId,
            dtendVal,
            locationVal,
            dtstartVal,
            titleVal,
            descriptionVal
          );
        }
      });
  }

  async function newBooking(
    bookingId,
    doctorId,
    dtendVal,
    locationVal,
    dtstartVal,
    titleVal,
    descriptionVal
  ) {
    let result = await addBooking({
      variables: {
        bookingId: bookingId,
        email: locationVal,
        dob: dtstartVal,
        patientName: titleVal,
        contactNumber: descriptionVal,
        doctorId: doctorId,
        apptDateTime: dtendVal,
      },
    });

    return result;
  }

  const handleTextChange = () => {
 
    setDisabled(
      document.getElementById("dtstart").value === "" ||
        document.getElementById("dtend").value === "" ||
        document.getElementById("event_title").value === "" ||
        document.getElementById("event_location").value === "" ||
        document.getElementById("event_description").value === "" ||
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
          id="dtstart_formatted"
          label="Date Of Birth"
          value={selectedDTStart}
          onChange={(dt) => {
            handleDTStartChange(dt);
            handleTextChange();
          }}
          format={dobFormat}
          style={inputStyle}
        />
        <DateTimePicker
          id="dtend_formatted"
          label="Appointment Date"
          value={selectedDTEnd}
          onChange={(dt) => {
            handleDTEndChange(dt);
            handleTextChange();
          }}
          format={dateFormat}
          style={inputStyle}
        />
      </MuiPickersUtilsProvider>
      <input
        defaultValue={selectedDTStart === null ? "" : selectedDTStart}
        id="dtstart"
        type="hidden"
      />
      <input
        defaultValue={selectedDTEnd === null ? "" : selectedDTEnd}
        id="dtend"
        type="hidden"
      />
      <TextField
        id="event_title"
        label="Patient Full Name"
        onChange={handleTextChange}
        style={inputStyle}
        inputRef={frmTitle}
        defaultValue={props.hasSelectedEvent ? props.selectedEvent.title : null}
      />
      <TextField
        id="event_location"
        label="EMail Address"
        onChange={handleTextChange}
        style={inputStyle}
        defaultValue={
          props.hasSelectedEvent ? props.selectedEvent.location : null
        }
      />
      <TextField
        id="event_description"
        label="Contact Number"
        onChange={handleTextChange}
        style={inputStyle}
        defaultValue={
          props.hasSelectedEvent ? props.selectedEvent.description : null
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
