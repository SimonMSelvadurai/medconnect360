import React from 'react';
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

 function Success(props) {
   console.log("Success   : ",props);
function sendEmail(e){
  e.preventDefault();
  emailjs.sendForm('service_02mze7n','template_16mpbeh',e.target,'user_p44kQTfMHGL9ZoCYpngq4').then (res =>{
    console.log(" sendEmail - > : ", res);
  }).catch(err =>console.log(err));
}
  
 return (
    <div>
        <h1>Success!!!</h1>
        <h2>Your booking is successfull !!!</h2>
        <Link
          to="/userAppointments"
          type="submit"
          className="btn btn-outline-secondary"
        >
          Go Back
        </Link>
    </div>
  );
 }
export default Success;