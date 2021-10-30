import React from "react";
import { useQuery } from '@apollo/client';
import { Container } from "../components/Container";
import { H2 } from "../components/Text";
import { QUERY_ALL_DOCTOR_NAMES } from '../gql/queries';
import DoctorList from '../components/DoctorList';

const Appointment = () => {

  const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  const doctors = data?.doctors || {};
  console.log("doctors",doctors);
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DoctorList
              doctors={doctors}
              title= "Here's the List of Doctors Please Proceed with Appointments..."
            />
          )}
        </div>
      </div>
    </main>
  );
}
export default Appointment;
