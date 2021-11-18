import React from 'react';
import { Link } from "react-router-dom";

 function Success(data) {
 return (
    <div>
        <h1>Success!!!</h1>
        <h2>Your booking is successfull!</h2>
        <Link
          to="/Appointment"
          type="submit"
          className="btn btn-outline-secondary"
        >
          Go Back
        </Link>
    </div>
  );
 }
export default Success;