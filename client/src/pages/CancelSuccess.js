import React from 'react';
import { Link } from "react-router-dom";

 function CancelSuccess(props) {
   console.log ("CancelSuccess Page ",props)
 return (
    <div>
        <h1>Success!!!</h1>
        <h2>Your booking is cancelled successfully!</h2>
        <h2>You can book appointment by clicking the Book Appointment !!!</h2>
        <Link
          to="/Appointment"
          type="submit"
          className="btn btn-outline-secondary"
        >
          Book Appointment 
        </Link>
    </div>
  );
 }
export default CancelSuccess;