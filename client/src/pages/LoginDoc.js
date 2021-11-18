import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

import { useMutation } from '@apollo/client';
import { LOGIN_DOC } from '../gql/mutations';
import Auth from '../utils/auth';

// import { Container } from "../components/Container";
// import { H2 } from '../components/Text';
// import { Breadcrumb } from '../components/Breadcrumb';
// import { Button } from '../components/Button';


import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginDoc(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [logindoc, { error }] = useMutation(LOGIN_DOC);

  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });
 
  const handleFormSubmit = async (event) => {
    try {
      const mutationResponse = await logindoc({
        variables: { email: event.email, password: event.password },
      });
      const token = mutationResponse.data.logindoc.token;
      const doctorId = mutationResponse.data.logindoc.doctor._id;
      Auth.login(token, 'Doctor', doctorId);
      // console.log("ROLLLLLLLLLLLLLLLLLLLLLEEEEEE",Auth.getRole());
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
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login Doctor</h2>
          </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                placeholder="Enter Email"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        {/* <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography> */}
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="/signupDoc" onClick={() => handleChange("event", 1)}>
            Sign Up Doctor
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default LoginDoc;
