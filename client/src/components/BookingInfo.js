import React from 'react';
import { Link } from 'react-router-dom';


import {QUERY_USER_BY_ID} from '../gql/queries';
const BookingInfo = () => {
  const { loading, data } = useQuery(QUERY_USER_BY_ID);


  const bookingUser = data?.user || {};
  console.log("user",bookingUser);




  // {
  //   doctors &&
  //   doctors.map((doctor) => ({
  //   //   key=doctor          
  //   // doctor.fullName
  //   //  doctor.Specialization
  //   }

            
          // <Link
          //   className="btn btn-block btn-squared btn-light text-dark"
          //   to={`/booking/${doctor._id}`}>
          //   Book Appointment
          // </Link>












// const DoctorList = ({ doctors, title }) => {
//   if (!doctors.length) {
//     return <h3>No doctors Yet</h3>;
//   }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {doctors &&
          doctors.map((doctor) => (
            <div key={doctor._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                  <th>Name of the Doctor</th>
                  {doctor.fullName && doctor.fullName.length > 0 ?'Dr.' : ''}
                  
                    <tr>{doctor.fullName}</tr>
                  {doctor.specialization && doctor.specialization.length > 0 ? '\'s Specialization : ' : ''}
                  <tr>{doctor.specialization}</tr>
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/booking/${doctor._id}`}>
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingInfo;