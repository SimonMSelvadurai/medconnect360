import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../gql/mutations';

import { Container } from '../components/Container';
import { H2 } from '../components/Text';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        dob: formState.dob,
        password: formState.password,
        fullName: formState.fullName,
        contactNumber: formState.contactNumber
      },
    });
    const token = mutationResponse.data.addUser.token;
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
      {/* <Breadcrumb location={'/login'} text={`← Go to Login`} /> */}
      <Container>
        <H2>Signup</H2>
        <form onSubmit={handleFormSubmit}>

        <div className="flex-row space-between my-2">
            {/* <label htmlFor="fullName">Full Name:</label> */}
            <input
              placeholder="Full Name"
              name="fullName"
              type="fullName"
              id="fullName"
              onChange={handleChange}
            />

          </div>
          
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
          <div></div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="contactNumber">ContactNumber:</label> */}
            <input
              placeholder="Contact Number"
              name="contactNumber"
              type="contactNumber"
              id="contactNumber"
              onChange={handleChange}
            />

          </div>
          <div className="flex-row space-between my-2">
            {/* <label htmlFor="dob">Date of birth:</label> */}
            <input
              placeholder="Date of birth"
              name="dob"
              type="dob"
              id="dob"
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

export default Signup;
