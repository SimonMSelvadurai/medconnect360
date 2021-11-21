import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../gql/mutations";

import { Container } from "../components/Container";
import { H2 } from "../components/Text";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";

function AddUser(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        fullName: formState.fullName,
        dob: formState.dob,
        contactNumber: formState.contactNumber,
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
      <Container>
        <H2>AddUser</H2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex-row space-between my-2">
            <label htmlFor="contactNumber">ContactNumber:</label>
            <input
              placeholder="012345678"
              name="contactNumber"
              type="contactNumber"
              id="contactNumber"
              onChange={handleChange}
            />
          </div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              id="dob"
              label="Date Of Birth"
              value={selectedDTStart}
              onChange={handleChange}
              format={dobFormat}
              style={inputStyle}
            />
          </MuiPickersUtilsProvider>

          <div className="flex-row space-between my-2">
            <label htmlFor="fullName">Full Name:</label>
            <input
              placeholder="John Doe"
              name="fullName"
              type="fullName"
              id="fullName"
              onChange={handleChange}
            />
          </div>

          <TextField
            id="fullName"
            label="Full Name"
            onChange={handleChange}
            style={inputStyle}
          />
          <div className="flex-row flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default AddUser;
