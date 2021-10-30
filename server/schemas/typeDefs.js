const { gql } = require('apollo-server-express');
const {GraphQLDateTime} = require('graphql-iso-date');
// const { DateTime } = require('graphql-scalars/mocks');
// scalar DateTime
//scalar Date


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
    bookingDate: String,
    apptDate: String,
    description: String,
    isTeleHealth: Boolean,
      clinicName: String,
      appointmentType: String
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
    doctors: [Doctor]!   
    doctorById(doctorId: String!) :Doctor
    userById(userId: String!) :User
    appointmentsByUserId(userId: String!) :[Appointment]!
    bookingById(bookingId: String!): Booking
  }
  type Mutation {
    addUser(email: String!, password: String!, dob:String!, 
    fullName: String!, contactNumber: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth

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
    

    addBooking(email: String, password: String,
      fullName: String,
      contactNumber: String,
      regNo: String,
      clinicName: String,
      specialization: String,
      doctorId: ID!,
      userId: ID,
      bookingDate: String,
      appointmentType: String
      ): Booking
  }
`;

module.exports = typeDefs;
