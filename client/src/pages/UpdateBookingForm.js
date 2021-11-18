import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { useParams,useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as moment from "moment";

// import {addAppointment} from '../../actions/appointment';
import { Link } from "react-router-dom";
import { QUERY_BOOKING_BY_BOOKING_ID } from "../gql/queries";
import profiles from "../pages/profiles/Profiles";
import { ADD_BOOKING } from "../gql/mutations";
// const Form = ({profile, doctorId,history, addAppointment}) => {
function UpdateBookingForm(props) {
  console.log("UpdateBookingForm PROPS",props);
  const history = useHistory();

  const  bookingId   = props.match.params.id;
  const [addBooking,{  error }] = useMutation(ADD_BOOKING, {
  onError: (error) => console.error("Error creating a post", error),
   onCompleted: () => {
      console.log("onCompleted() : Data from mutation", data);
      console.log("onCompleted() : mutationResponse : Data from mutation");
        history.push('/success', { data: data })
        window.location.reload();
      },
  });

//   const [createPost, { loading, error }] = useMutation(CREATE_POST, {
//     onCompleted: (data) => console.log("Data from mutation", data),
//     onError: (error) => console.error("Error creating a post", error),
//   });


  //doctorId = props.doctorId
  // console.log("AppointmentForm props 1 : ",props.match.params.id);
  // console.log("Form props 1 doctorId: ", props.doctorId);

  const time = props.location.state.apptDateTime;

  const [formState, setFormState] = useState({
    
    patientName: props.location.state.patientName,
    patientDOB: props.location.state.patientDOB,
    patientContactNumber: props.location.state.patientContactNumber,
    patientEmail: props.location.state.patientEmail,
    apptDateTime: props.location.state.apptDateTime,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    patientName,
    patientDOB,
    patientContactNumber,
    patientEmail,
    apptDateTime,
  } = formState;

  const onChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

  // console.log("<========= DoctorID ========= > ", doctorId);
  //Load Doctor
  const { loading, data } = useQuery(QUERY_BOOKING_BY_BOOKING_ID, {
    // pass URL parameter
    variables: { bookingId: bookingId },
  });
  const bookingDetails = data?.userBookings || {};
  console.log("<========= Selected Booking Details ========= > ", bookingDetails);
  console.log("<========= Selected Booking Details <data> ========= > ", data);
  // const doctorName = data.doctorName;
  const userId = Auth.getUserId();
  // console.log("USEEEEEEEEEEEEEEEr id ", userId);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addBooking({
        variables: {
          doctorId: props.location.state.doctorId,
          userId: userId,
          doctorName: bookingDetails.fullName,
          // userId: "6174bf41b102a16e34655c36",
          patientEmail: formState.patientEmail,
          //password: formState.password,
          // dob: formState.dob,
          //password: formState.password,
          patientName: formState.patientName,
          patientContactNumber: formState.patientContactNumber,
          apptDate: formState.apptDate,
          patientDOB: formState.patientDOB,
          apptDateTime: formState.apptDateTime,
          apptDateTime: moment(formState.apptDateTime).format("LLLL"),


          // isTeleHealth: "false",
          // clinicName: formState.clinicName,
        },
      });
      //console.log("{{{{{{{{{{{mutationResponse}}}}}}}}}", mutationResponse);
      // <Link to={`/Success`} response={mutationResponse}> </Link>
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <br />
      <div className="heading-common">
        <h1>
          <strong>Book Appointment</strong>
        </h1>
        <p className="lead">Provide your details and book your appointment.</p>
        <div className="appointment-doctor">
          <img
            className="round-img appointment-img"
            src={profiles.avatar}
            alt=""
          />
          <p className="lead">
            <strong>{profiles.name}</strong>
          </p>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        {/* submitSuccess && <Redirect to="/"  submitSuccess && <Link to="/Appointment/> */}
        {/* <form onSubmit={e => {
                e.preventDefault();
                addAppointment(doctorId, formData);  
            }}> */}
        <small>* = required field</small>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* Patient name"
            name="patientName"
            value={patientName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* patientContactNumber"
            name="patientContactNumber"
            value={patientContactNumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="* patientEmail"
            name="patientEmail"
            value={patientEmail}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="* Status"
                        name="status" 
                        value={status} 
                        onChange={e => onChange(e)} />
                        <small className="form-text">Status like profession (eg. student, job etc)</small>
                    </div> */}
        <h6>Patient Date of Birth</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="patientDOB"
            value={patientDOB}
            onChange={(e) => onChange(e)}
          />
        </div>
        <h6>Appointment Date</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="apptDateTime"
            value={apptDateTime}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <div className="form-group">
                    <textarea 
                        className="form-control" 
                        placeholder="* Health Problem Description" 
                        name="description" 
                        value={description}
                        onChange={e => onChange(e)}
                        ></textarea>
                    <small className="form-text">Tell us about the Health Problem.</small>
                </div> */}
        <input type="submit" value="Submit" className="btn btn-info" />{" "}
        <Link
          to="/Appointment"
          type="submit"
          className="btn btn-outline-secondary"
        >
          Go Back
        </Link>
      </form>
      <br />
    </Fragment>
  );
}

// Form.propTypes = {
//     addAppointment: PropTypes.func.isRequired
// }

export default UpdateBookingForm; // connect(null, {addAppointment})(

