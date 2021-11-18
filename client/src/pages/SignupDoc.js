import React, { useState } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ADD_DOCTOR } from "../gql/mutations";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignupDoc = (props) => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };
  const btnstyle = { margin: "8px 0" };
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    fullName: "",
    contactNumber: "",
    regNo: "",
    clinicName: "",
    education: "",
    clinicAddress: "",
    specialization: "",
  });
  const [addDoctor] = useMutation(ADD_DOCTOR);

  const initialValues = {
    email: "",
    password: "",
    fullName: "",
    contactNumber: "",
    regNo: "",
    specialization: "",
    education: "",
    clinicName: "",
    clinicAddress: "",
  };
  const validationSchema = Yup.object().shape({
    fullName : Yup.string().required("Required"),
    email: Yup.string().email("please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
    contactNumber: Yup.string().required("Required"),
    regNo: Yup.string().required("Required"),
    specialization: Yup.string().required("Required"),
    education: Yup.string().required("Required"),
    clinicName: Yup.string().required("Required"),
    clinicAddress: Yup.string().required("Required"),

    
  });

//   const handleFormSubmit = () => {
//     console.log("handleFormSubmit");
//   };
  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    const mutationResponse = await addDoctor({
      variables: {
        email: event.email,
        password: event.password,
        fullName: event.fullName,
        contactNumber: event.contactNumber,
        regNo: event.regNo,
        education: event.education,
        clinicAddress: event.clinicAddress,
        clinicName: event.clinicName,
        specialization: event.specialization

      },
    });
    const token = mutationResponse.data.addDoctor.token;
    Auth.login(token, 'Doctor');
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
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up Doctor</h2>
          <Typography variant="caption" gutterBottom>
            Please create an account as Doctor !
          </Typography>
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
                fullWidth
                label="FullName"
                name="fullName"
                placeholder="Enter your FullName"
                required
                helperText={<ErrorMessage name="fullName" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter your email"
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="ContactNumber"
                name="contactNumber"
                placeholder="Enter your Contact number"
                required
                helperText={<ErrorMessage name="contactNumber" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="RegNo"
                name="regNo"
                placeholder="Enter your Registration number"
                required
                helperText={<ErrorMessage name="regNo" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Specialization"
                name="specialization"
                placeholder="Enter your Specialization"
                required
                helperText={<ErrorMessage name="specialization" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Education"
                name="education"
                placeholder="Enter your Education"
                required
                helperText={<ErrorMessage name="education" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Clinic Name"
                name="clinicName"
                placeholder="Enter your Clinic Name"
                required
                helperText={<ErrorMessage name="clinicName" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Clinic Address"
                name="clinicAddress"
                placeholder="Enter the Clinic Address"
                required
                helperText={<ErrorMessage name="clinicAddress" />}
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

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="/loginDoc" onClick={() => handleChange("event", 1)}>
            Login Doctor
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignupDoc;
