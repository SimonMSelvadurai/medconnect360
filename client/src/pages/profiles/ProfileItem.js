import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, useGravatar } from "@agney/react-avatar";

import { useLocation } from "react-router-dom";

const ProfileItem = ({ doctor }) => {
  console.log("ProfileItem  doctor : - ", doctor);
  const location = useLocation();
  console.log(location);

  return (
    <div classNameName="profiles">
      <div className="profile-1">
        <div className="profile-img"></div>
        <div className="profile-details">
          <div className="profile-desc">
            <h2 className="profile-heading">
              <strong>{doctor.fullName}</strong>
            </h2>
            <p className="profile-p">
              <strong>{doctor.specialization}</strong>{" "}
            </p>
            <p className="profile-p2">
              <strong>{doctor.clinicName}</strong>{" "}
            </p>
            <p className="profile-p">
              <strong>{doctor.clinicAddress}</strong>
            </p>
          </div>
        </div>
        <div className="mx-auto profile-buttons">
          <Fragment>
            <Link
              to={`/appointment/${doctor._id}`}
              profile={doctor}
              type="button"
              className="rounded-pill profile-btn btn btn-info"
            >
              <i className="fas fa-calendar-check"></i> Book Appointment
            </Link>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
