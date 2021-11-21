import React, { useEffect, useState, Fragment } from 'react';
import Form from './Form';
import img from '../../images/calendar.svg';
import { useParams } from "react-router-dom";
import profiles from '../../pages/profiles/Profiles';

const AppointmentForm = (props) =>{
    console.log("AppointmentForm props 1 : ",props);
     console.log("AppointmentForm  : profile.doctor ",profiles);
    
    console.log("AppointmentForm props 1 : ",props.match.params.id);
    const doctorId = props.match.params.id;
     console.log("AppointmentForm doctorId ",doctorId);
    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div className="common-form">
                        <div className="form-side">
                        {
                                doctorId !== null ? 
                                (
                                    <Form profile={profiles.name} 
                                    doctorId={doctorId} />
                                ) : (
                                    ""
                                )
                            }
                        </div>
                        <div className="img-side">
                            <img src={img} alt="" className="register-user" />

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default AppointmentForm;
