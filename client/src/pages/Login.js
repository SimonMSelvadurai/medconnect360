import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations';
import Auth from '../utils/auth';
import TextField from "@material-ui/core/TextField";
import { Container } from "../components/Container";
import { H2 } from '../components/Text';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';








function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
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

  const inputStyle = {
    minWidth: "14em"
  };
  const formTitleStyle = {
    fontWeight: "bold"
  };

  const containerStyle = {
    backgroundColor: "#cccccc",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.5em",
    justifyContent: "space-around",
    padding: "0.5em 1em",
    width: "100%"
  };

  return (
    <>
      {/* <Breadcrumb location={'/signup'} text={`← Go to Signup`} /> */}
      <Container>
        <H2>Login</H2>
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

//   return (
//     <div style={containerStyle} id="appointmentform">
//       <form onSubmit={handleFormSubmit}>
//       <h3 style={formTitleStyle}>{props.formTitle}</h3>
//       {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DateTimePicker
//           id="dtstart_formatted"
//           label="Start"
//           value={selectedDTStart}
//           onChange={dt => {
//             handleDTStartChange(dt);
//             handleTextChange();
//           }}
//           format={dateFormat}
//           style={inputStyle}
//         />
//         <DateTimePicker
//           id="dtend_formatted"
//           label="End"
//           value={selectedDTEnd}
//           onChange={dt => {
//             handleDTEndChange(dt);
//             handleTextChange();
//           }}
//           format={dateFormat}
//           style={inputStyle}
//         />
//       </MuiPickersUtilsProvider> 
//       <input
//         defaultValue={selectedDTStart === null ? "" : selectedDTStart}
//         id="dtstart"
//         type="hidden"
//       />
//       <input
//         defaultValue={selectedDTEnd === null ? "" : selectedDTEnd}
//         id="dtend"
//         type="hidden"
//       />  */}


//       <TextField
//         id="email"
//         label="Email"
//         onChange={handleChange}
//         style={inputStyle}
//         inputRef={frmTitle}
//         // defaultValue={props.hasSelectedEvent ? props.selectedEvent.title : null}
//       />
// {/* 
// <input
//               placeholder="Email"
//               name="email"
//               type="email"
//               id="email"
//               onChange={handleChange} */}

//       <TextField
//         id="event_location"
//         label="Location"
//         onChange={handleTextChange}
//         style={inputStyle}
//         // defaultValue={
//         //   props.hasSelectedEvent ? props.selectedEvent.location : null
//         // }
//       />
//       {/* <TextField
//         id="event_description"
//         label="Description"
//         onChange={handleTextChange}
//         style={inputStyle}
//         defaultValue={
//           props.hasSelectedEvent ? props.selectedEvent.description : null
//         }
//       />
//       <div style={{ marginTop: "2em", minWidth: "12em" }}>
//         <Button
//           variant="contained"
//           onClick={props.onFormCancel}
//           style={{ marginRight: "1em" }}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit}
//           id="formSubmit"
//           disabled={isDisabled}
//         >
//           Submit
//         </Button> */}
//       {/* </div> */}
//       </form>
//     </div>
//   );
  
}

export default Login;
