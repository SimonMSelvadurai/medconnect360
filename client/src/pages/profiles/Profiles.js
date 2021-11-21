import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { QUERY_ALL_DOCTOR_NAMES } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import ProfileItem from "./ProfileItem";
import Moment from "react-moment";

function Profiles() {
  //Load Doctors
  const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  const doctors = data?.doctors || {};
  console.log(" Profiles doctorsdoctors", doctors);
  const keys = Object.keys(doctors);
  const doctorsList = Object.values(doctors);
  console.log("doctors Keys : ", keys);
  console.log("doctors Values : ", doctorsList);

  doctorsList.forEach((doctor)=> {
    console.log(doctor.fullName)
    console.log(doctor.contactNumber)
    console.log(doctor.email)
}); 

return (
    <Fragment>
        { loading ? <Spinner /> : 
            <Fragment>
            <section id="profiles-page">
                <div className="container">
                    <div className="heading-common">
                        <h1><strong>Doctor Profiles</strong></h1>  
                    </div>
                    <h2 className="welcome-heading"><i className="fas fa-user-md"></i> Book your Appointments</h2>
                    <br />
                    {
                        doctorsList != null ? (
                            doctorsList.map(doctor => (
                                <ProfileItem key={doctor._id} doctor={doctor} />
                            ))
                        ) : <h4>No Profiles found..</h4>
                    }
                </div>
            </section>
            </Fragment>
        }
    </Fragment>
)
}

export default Profiles;

