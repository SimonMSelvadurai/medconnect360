import React,{ useState } from 'react';
import Auth from "../utils/auth";
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useMutation } from '@apollo/client';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ADD_USER } from '../gql/mutations';


const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: "8px 0" };
    const [addUser] = useMutation(ADD_USER);

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        fullName: "",
        contactNumber: "",
        dob: "",
      });

      const initialValues = {
        email: "",
        password: "",
        fullName: "",
        contactNumber: "",
        dob: "",
      };

      const validationSchema = Yup.object().shape({
        fullName : Yup.string().required("Required"),
        email: Yup.string().email("please enter valid email").required("Required"),
        password: Yup.string().required("Required"),
        contactNumber: Yup.string().required("Required"),
        dob: Yup.string().required("Required"),
               
      });

      const handleFormSubmit = async (event) => {
        const mutationResponse = await addUser({
          variables: {
            email: event.email,
            password: event.password,
            dob: event.dob,
            fullName: event.fullName,
            contactNumber: event.contactNumber
          },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token, 'User');
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    const marginTop = { marginTop: 5 }
    return (
        <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please create an account as User !
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
                <h5>Patient Date of Birth</h5>
                <Field
                  as={TextField}
                  fullWidth
                  name="dob"
                  type="date"
                  required
                  helperText={<ErrorMessage name="dob" />}
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
            <Link href="/login" onClick={() => handleChange("event", 1)}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Grid>
            )
}

export default Signup;