const { gql } = require('apollo-server-express');
const {GraphQLDateTime} = require('graphql-iso-date');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    dob:String
    fullName: String
    contactNumber: String
  }

  type Doctor {
    _id: ID
    email: String
    password: String
    fullName:String
    contactNumber:String
    regNo:String
    education:String
    clinicAddress:String
    clinicName:String
    specialization:String
    bookings: [Booking]
    
  }

  type Booking {
    _id : ID,
    userId: ID,
    doctorId: ID!,
    doctorName: String,
    bookingDate: String,
    apptDateTime: String,
    description: String,
    isTeleHealth: Boolean,
      clinicName: String,
      appointmentType: String,
      patientEmail: String,
      patientDOB: String,
    patientName:String,
    patientContactNumber:String,
  }
  
  type Auth {
    token: ID
    user: User
    doctor: Doctor
  }

  type Appointment {
    _id : ID
    user: User!
    doctor: Doctor!
    bookingStatus: String!,
    bookingDate: String!,
    apptDate: String!,
    description: String!,
    isTeleHealth: Boolean!,
      clinicName: String!,
      clinicAddress: String!
  }

  type Query {
    user: User
    doctor :Doctor
    booking : Booking
    userBookings : [Booking]
    doctors: [Doctor]!   
    doctorById(doctorId: String!) :Doctor
    userById(userId: String!) :User
    userByEmail(email: String!) :User
    appointmentsByUserId(userId: String!) :[Appointment]!
    bookingById(bookingId: ID!): Booking
    bookingsByUserId: [Booking]
    doctorAppointments(doctorId: String!):[Booking]
  }
  type Mutation {
    addUser(email: String!, password: String!, dob:String!, 
    fullName: String!, contactNumber: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
    bookUser(email: String!, dob:String!, 
      fullName: String!, contactNumber: String!): User

    addDoctor(email: String!, password: String!,
      fullName: String!,
      contactNumber: String!,
      regNo: String!,
      education: String!,
      clinicAddress: String!,
      clinicName: String!,
      specialization: String!
      ): Auth
      
    updateDoctor(email: String, password: String): Doctor
    logindoc(email: String!, password: String!): Auth
    

    addBooking(patientEmail: String, patientDOB: String,
      patientName: String,
      patientContactNumber: String,
      doctorId: ID!,
      doctorName: String,
      bookingDate: String,
      apptDateTime: String,
      userId: ID,
      ): Booking

      removeBooking(bookingId: ID!) : Booking

      updateBooking(bookingId: ID!,patientEmail: String, patientDOB: String,
        patientName: String,
        patientContactNumber: String,
        doctorId: ID!,
        doctorName: String,
        bookingDate: String,
        apptDateTime: String,
        userId: ID,
        ): Booking
  
  }
`;

module.exports = typeDefs;
