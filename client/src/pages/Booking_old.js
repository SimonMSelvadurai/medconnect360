import React, { useState } from "react";
import { useHistory} from "react-router-dom";

import { H2 } from "../components/Text";
import DateTimePicker from 'react-datetime-picker';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { QUERY_ALL_DOCTOR_NAMES } from '../gql/queries';
import { ADD_BOOKING } from '../gql/mutations';

import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { 
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Avatar,
   Grid,
   Typography,
   TablePagination,
   TableFooter
} from '@material-ui/core';
import { useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
   table: {
     minWidth: 650,
   },
   tableContainer: {
       borderRadius: 15,
       margin: '10px 10px',
       maxWidth: 950
   },
   tableHeaderCell: {
       fontWeight: 'bold',
       backgroundColor: theme.palette.primary.dark,
       color: theme.palette.getContrastText(theme.palette.primary.dark)
   },
   avatar: {
       backgroundColor: theme.palette.primary.light,
       color: theme.palette.getContrastText(theme.palette.primary.light)
   },
   name: {
       fontWeight: 'bold',
       color: theme.palette.secondary.dark
   },
   status: {
       fontWeight: 'bold',
       fontSize: '0.75rem',
       color: 'white',
       backgroundColor: 'grey',
       borderRadius: 8,
       padding: '3px 10px',
       display: 'inline-block'
   }
 }));

const Booking = () => {

const history = useHistory();

const [addBooking] = useMutation(ADD_BOOKING);
 const [formState, setFormState] = useState({ 
     email: "", apptDate:"", fullName:"", contactNumber: "", description:"" , isTeleHealth:"" ,clinicName:"" ,clinicAddress:"" 
});

const handleFormSubmit = async (event) => {
   event.preventDefault();
   const mutationResponse = await addBooking({
     variables: {
       email: formState.email,
       //password: formState.password,
       dob: formState.dob,
       //password: formState.password,
       fullName: formState.fullName,
       contactNumber: formState.contactNumber,
       doctorId: doctorId,
       userId: "617a0b73d7911554c8e365e2",

       apptDate: formState.apptDate,
       description: formState.description,
       isTeleHealth: formState.isTeleHealth,
       clinicName: formState.clinicName,
       clinicAddress: formState.clinicAddress,
       // apptDate
       // description
       // isTeleHealth
       // clinicName
       // clinicAddress
     },
   });

   const handleChange = (event) => {
     const { name, value } = event.target;
     setFormState({
       ...formState,
       [name]: value,
     });
   };


return (
<>

<h2>Test Page</h2>
     {/* <Container>
        <H2>AddBooking</H2>
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
           <div className="flex-row space-between my-2">
             <label htmlFor="dob">Date of birth:</label>
             <input
               placeholder="01/01/2000"
               name="dob"
               type="dob"
               id="dob"
               onChange={handleChange}
             />
           </div>
           <div className="flex-row space-between my-2">
             <label htmlFor="apptDate">Appointment Date:</label>
             <input
               placeholder="01/01/2000"
               name="apptDate"
               type="apptDate"
               id="apptDate"
               onChange={handleChange}
             />
           </div>


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


           <div className="flex-row space-between my-2">
             <label htmlFor="description">Description</label>
             <input
               placeholder="General Appointment"
               name="description"
               type="description"
               id="description"
               onChange={handleChange}
             />
           </div>


           <div className="flex-row space-between my-2">
             <label htmlFor="isTeleHealth">Tele Health</label>
             <input
               placeholder="John Doe"
               name="isTeleHealth"
               type="isTeleHealth"
               id="isTeleHealth"
               onChange={handleChange}
             />
           </div>


           <div className="flex-row space-between my-2">
             <label htmlFor="clinicName">Clinic Name:</label>
             <input
               placeholder="MyClinic"
               name="clinicName"
               type="clinicName"
               id="clinicName"
               onChange={handleChange}
             />
           </div>


           <div className="flex-row space-between my-2">
             <label htmlFor="clinicAddress">Full Name:</label>
             <input
               placeholder="BoxHill"
               name="clinicAddress"
               type="clinicAddress"
               id="clinicAddress"
               onChange={handleChange}
             />
           </div>
           <div className="flex-row space-between my-2" >
           <DateTimePicker
           onChange={handleChange}
           // value={value} 
           />
           </div>

           <div className="flex-row flex-end">
             <Button type="submit">Submit</Button>
           </div>
         </form>
       </Container>
       */}

</> 
     
);
};

}

export default Booking_old;

