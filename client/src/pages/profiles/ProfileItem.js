import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
// import DoctorList from '../../components/DoctorList';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';

import {useLocation} from "react-router-dom";
// function ProfileItem ()
const ProfileItem = ({ doctor }) => {

    const location = useLocation();
    console.log(location);
// DoctorList: {
//     _id, 
//     fullName,
// email,
// contactNumber,
// education,
// specialization,
// clinicAddress,
// clinicName,
//  avatar
//  }
// ruppess


// authUser



    
    // console.log("doctorProfiledoctorProfiledoctorProfile");


    
    return (
        // <div classNameName="profiles">
      <div classNameName="profiles">

        <div className="profile-1">
                <div className="profile-img">
                    {/* <img src={avatar} alt="" /> */}
                </div>
                <div className="profile-details">
                    <div className="profile-desc">
                        <h2 className="profile-heading"><strong>{doctor.fullName}</strong></h2>
                        <p className="profile-p"><strong>{doctor.specialization}</strong> </p>
                        <p className="profile-p2"><strong>{doctor.clinicName}</strong> </p>
                        <p className ="profile-p"><strong>{doctor.clinicAddress}</strong></p>
                        {/* {doctor._id} */}
 
                        {/* <p className="profile-p2"><strong>{ruppess}</strong> Consultation fee at clinic</p> */}
                    </div>
                </div>
                 <div className="mx-auto profile-buttons">
                    {/* {/* // {authUser.isUserAuthenticated ? ( */}
                        <Fragment>
                            <Link to={`/appointment/${doctor._id}`} profile={doctor} type="button" className="rounded-pill profile-btn btn btn-info"><i className="fas fa-calendar-check"></i> Book Appointment</Link>
                        </Fragment>
                    {/* //     ) : (
                    //         <Fragment>
                    //             <button type="button" data-toggle="tooltip" data-placement="right" title="Please Login as a User" className="rounded-pill profile-btn btn btn-info disabled">
                    //                 <i className="fas fa-calendar-check"></i> Book Appointment
                    //             </button>
                    //         </Fragment>
                    //     )
                    // } */} 
                    <Link to={`/doctor/${doctor._id}`} type="button" className="rounded-pill profile-btn btn btn-dark">View Profile</Link>
                </div>
            </div>
    </div>
    )
};

// ProfileItem.propTypes ={
//     profile: PropTypes.object.isRequired,
//     authUser: PropTypes.object.isRequired
// };
// const mapStateToProps =state => ({
//     authUser: state.authUser
// });

export default ProfileItem;
