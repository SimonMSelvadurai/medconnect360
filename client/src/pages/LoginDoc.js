import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_DOC } from '../gql/mutations';
import Auth from '../utils/auth';

import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

function LoginDoc(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [logindoc, { error }] = useMutation(LOGIN_DOC);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await logindoc({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.logindoc.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
      <Breadcrumb location={'/signup'} text={`← Go to Signup`} />
      <Container>
        <H2>Login Doctor</H2>
        <form onSubmit={handleFormSubmit}>
        

          <div className="flex-row space-between my-2">
            {/* <label htmlFor="email">Email address:</label> */}
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
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default LoginDoc;
