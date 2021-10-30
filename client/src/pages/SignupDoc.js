import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_DOCTOR } from '../gql/mutations';

import { Container } from '../components/Container';
import { H2 } from '../components/Text';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

function SignupDoc(props) {
  const [formState, setFormState] = useState({ email: '', password: '',fullName: '' , contactNumber: '', regNo: '', clinicName: '',  education: '',clinicAddress:'' , specialization :''});
  const [addDoctor] = useMutation(ADD_DOCTOR);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addDoctor({
      variables: {
        email: formState.email,
        password: formState.password,
        fullName: formState.fullName,
        contactNumber: formState.contactNumber,
        regNo: formState.regNo,
        education: formState.education,
        clinicAddress: formState.clinicAddress,
        clinicName: formState.clinicName,
        specialization: formState.specialization
        
      },
    });
    const token = mutationResponse.data.addDoctor.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Breadcrumb location={'/login'} text={`← Go to Login`} />
      <Container>
        <H2>Signup Doctor</H2>
        <form onSubmit={handleFormSubmit}>
         
         
        <div className="flex-row space-between my-2">
            {/* <label htmlFor="fullName">FullName:</label> */}
            <input
              placeholder="FullName"
              name="fullName"
              type="fullName"
              id="fullName"
              onChange={handleChange}
            />

<div className="flex-row space-between my-2">
            {/* <label htmlFor="email">Email:</label> */}
            <input
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="pwd">Password:</label> */}
            <input
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>

          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="contactNumber">Contact Number:</label> */}
            <input
              placeholder="Contact Number"
              name="contactNumber"
              type="contactNumber"
              id="contactNumber"
              onChange={handleChange}
            />

          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="regNo">regNo:</label> */}
            <input
              placeholder="RegNo"
              name="regNo"
              type="regNo"
              id="regNo"
              onChange={handleChange}
            />

          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="clinicName">Clinic Name:</label> */}
            <input
              placeholder="Clinic Name"
              name="clinicName"
              type="clinicName"
              id="clinicName"
              onChange={handleChange}
            />

          </div>

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="clinicAddress">Clinic Address:</label> */}
            <input
              placeholder="Clinic Address"
              name="clinicAddress"
              type="clinicAddress"
              id="clinicAddress"
              onChange={handleChange}
            />

          </div>


          <div className="flex-row space-between my-2">
            {/* <label htmlFor="education">education:</label> */}
            <input
              placeholder="Education"
              name="education"
              type="education"
              id="education"
              onChange={handleChange}
            />

          </div>
         
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="specialization">Specialization:</label> */}
            <input
              placeholder="Specialization"
              name="specialization"
              type="specialization"
              id="specialization"
              onChange={handleChange}
            />

          </div>
                 
         
         
          <div className="flex-row flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default SignupDoc;
