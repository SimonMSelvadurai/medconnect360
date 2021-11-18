import React, { useEffect, useState, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {getProfileById} from '../../actions/profile';
import Form from './Form';
// import { withRouter } from 'react-router-dom';
import img from '../../images/calendar.svg';
import { useParams } from "react-router-dom";
import profiles from '../../pages/profiles/Profiles';


// const AppointmentForm = ({
//     getProfileById,
//     profile: {profileById},
//     match,
//     history
// }) => {profileById
//     useEffect(() => {
//         getProfileById(match.params.id)
//     },[getProfileById, match.params.id]);

const AppointmentForm = (props) =>{
    //const { doctorId } = useParams();
    console.log("AppointmentForm props 1 : ",props);
     console.log("AppointmentForm  : profile.doctor ",profiles);
    
    console.log("AppointmentForm props 1 : ",props.match.params.id);
    const doctorId = props.match.params.id;
     console.log("AppointmentForm doctorId ",doctorId);
    
    // doctorId = props.params.id;

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div className="common-form">
                        <div className="form-side">
                        {
                                doctorId !== null ? 
                                (
                                    <Form profile={profiles.doctor} 
                                    // history={history} 
                                    doctorId={doctorId} />
                                ) : (
                                    ""
                                )
                            }
                        </div>
                        <div className="img-side">
                            {/* <img src={require("../../images/calendar.svg")} alt="" className="register-user" /> */}
                            <img src={img} alt="" className="register-user" />

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    );
};

// AppointmentForm.propTypes = {
//     getProfileById: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     profile: state.profile,
// });

// export default connect(mapStateToProps, {getProfileById})(withRouter(AppointmentForm));

export default AppointmentForm;
