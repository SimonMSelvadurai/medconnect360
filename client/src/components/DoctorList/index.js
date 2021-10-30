import React from 'react';
import { Link } from 'react-router-dom';

const DoctorList = ({ doctors, title }) => {
  if (!doctors.length) {
    return <h3>No doctors Yet</h3>;
  }



    //   doctor
    //     name: faker.name.findName(),
    //     email: faker.internet.email(),
    //     phone: faker.phone.phoneNumber(),
    //     jobTitle: faker.name.jobTitle(),
    //     company: faker.company.companyName(),
    //     joinDate: faker.date.past().toLocaleDateString('en-US'),
    //     status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    // }
//}
//////////////////////

{/* <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                  <th>Name of the Doctor</th>
                  <tr>{doctor.fullName && doctor.fullName.length > 0 ?'Dr.' : ''}
                  
                    {doctor.fullName}</tr>
                  {/* {doctor.specialization && doctor.specialization.length > 0 ? '\'s Specialization : ' : ''} */}
                //   <tr>{doctor.specialization}</tr>
                //   </span>
                // </h4> */}


              //   <Link
              //   className="btn btn-block btn-squared btn-light text-dark"
              //   to={`/booking/${doctor._id}`}>
              //   Book Appointment
              // </Link>
/////////////////////////////                


  return (
    <div>

     <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {doctors &&
          doctors.map((doctor) => (
                     <div key={doctor._id}>
                    {doctor.specialization}
              </div>
            
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
