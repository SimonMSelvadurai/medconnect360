import React from "react";

const DoctorList = ({ doctors, title }) => {
  if (!doctors.length) {
    return <h3>No doctors Yet</h3>;
  }
  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {doctors &&
          doctors.map((doctor) => (
            <div key={doctor._id}>{doctor.specialization}</div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
