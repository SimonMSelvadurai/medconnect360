import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const LOGIN_DOC = gql`
  mutation logindoc($email: String!, $password: String!) {
    logindoc(email: $email, password: $password) {
      token
      doctor {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $dob: String!
    $fullName: String!
    $contactNumber: String!
  ) {
    addUser(
      email: $email
      password: $password
      dob: $dob
      fullName: $fullName
      contactNumber: $contactNumber
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const BOOK_USER = gql`
  mutation bookUser(
    $email: String!
    $dob: String!
    $fullName: String!
    $contactNumber: String!
  ) {
    bookUser(
      email: $email
      dob: $dob
      fullName: $fullName
      contactNumber: $contactNumber
    ) {
        _id
    }
  }
`;

export const ADD_DOCTOR = gql`
  mutation addDoctor(
    $email: String!
    $password: String!
    $fullName: String!
    $contactNumber: String!
    $regNo: String!
    $education: String!
    $clinicAddress: String!
    $clinicName: String!
    $specialization: String!
  ) {
    addDoctor(
      email: $email
      password: $password
      fullName: $fullName
      contactNumber: $contactNumber
      regNo: $regNo
      education: $education
      clinicAddress: $clinicAddress
      clinicName: $clinicName
      specialization: $specialization
    ) {
      token
      doctor {
        _id
      }
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking(
    $patientEmail: String
    $patientDOB:String
    $patientName: String
    $patientContactNumber: String
    $doctorId: ID!
    $doctorName: String
    $bookingDate: String
    $apptDateTime: String
    $userId: ID
    
  ) {
    addBooking(
      patientEmail: $patientEmail
      patientDOB: $patientDOB
      patientName: $patientName
      patientContactNumber: $patientContactNumber
      doctorId: $doctorId
      doctorName: $doctorName
      bookingDate: $bookingDate
      apptDateTime: $apptDateTime
      userId: $userId
    ) {
        _id 
        patientName
        patientContactNumber
        doctorName
        patientEmail
          
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation updateBooking($bookingId: ID!
    $patientEmail: String
    $patientDOB:String
    $patientName: String
    $patientContactNumber: String
    $doctorId: ID!
    $doctorName: String
    $bookingDate: String
    $apptDateTime: String
  ) {
    updateBooking(
      bookingId:$bookingId
      patientEmail: $patientEmail
      patientDOB: $patientDOB
      patientName: $patientName
      patientContactNumber: $patientContactNumber
      doctorId: $doctorId
      doctorName: $doctorName
      bookingDate: $bookingDate
      apptDateTime: $apptDateTime
    ) {
        _id 
        patientName
        patientDOB
        patientEmail
        patientContactNumber
        apptDateTime
        doctorName
        doctorId       
          
    }
  }
`;

export const REMOVE_BOOKING = gql`
  mutation removeBooking($bookingId: ID!) {
    removeBooking(bookingId: $bookingId) {
      _id
    }
  }
`;



