import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { useParams,useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { QUERY_DOCTOR_BY_ID } from "../../gql/queries";
import profiles from "../../pages/profiles/Profiles";
import { ADD_BOOKING } from "../../gql/mutations";
function Form(props) {
  const history = useHistory();
  const { doctorId } = useParams();
  const [addBooking,{  error }] = useMutation(ADD_BOOKING, {
    onError: (error) => console.error("Error creating a post", error),
    onCompleted: () => {
      console.log("onCompleted() : Data from mutation", data);
      console.log("onCompleted() : mutationResponse : Data from mutation");
        history.push({  pathname: '/success', state:data});
        window.location.reload();
      },
  });

  const [formState, setFormState] = useState({
    patientName: "",
    patientDOB: "",
    patientContactNumber: "",
    patientEmail: "",
    apptDateTime: "",
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

  //Load Doctor
  const { loading, data } = useQuery(QUERY_DOCTOR_BY_ID, {
    // pass URL parameter
    variables: { doctorId: props.doctorId },
  });
  const doctorDetails = data?.doctorById || {};
  const userId = Auth.getUserId();
   console.log("User ID : Form.js", userId);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addBooking({
        variables: {
          doctorId: props.doctorId,
          userId: userId,
          doctorName: doctorDetails.fullName,
          patientEmail: formState.patientEmail,
          patientName: formState.patientName,
          patientContactNumber: formState.patientContactNumber,
          apptDate: formState.apptDate,
          patientDOB: formState.patientDOB,
          apptDateTime: formState.apptDateTime,
        },
      });
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
                      <i className="fas fa-user-md">
                     </i>



          <p className="lead">
         
            <strong > { "                " }              Dr.{doctorDetails.fullName}</strong>
          </p>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
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



export default Form;
