import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      email
    }
  }
`;
export const QUERY_DOCTOR = gql`
  {
    doctor {
      email
    }
  }
`;

export const QUERY_ALL_DOCTOR_NAMES = gql`
  query allDoctors {
    doctors {
      _id
      fullName
      email
      contactNumber
      education
      specialization
      clinicAddress
      clinicName
    }
  }
`;

export const QUERY_DOCTOR_BY_ID = gql`
  query doctorById($doctorId: String!) {
    doctorById(doctorId: $doctorId) {
      fullName
      email
      education
      specialization
      clinicAddress
      clinicName
      contactNumber
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query userById($userId: String!) {
    userById(userId: $userId) {
      fullName
      dob
      email
      contactNumber
    }
  }
`;

export const QUERY_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      fullName
      dob
      email
      contactNumber
    }
  }
`;

export const QUERY_BOOKING_BY_BOOKING_ID = gql`
  query bookingById($bookingId: ID!) {
    bookingById(bookingId: $bookingId) {
      patientEmail
      patientDOB
      patientName
      patientContactNumber
      clinicName
      doctorId
      doctorName
      userId
      bookingDate
      apptDateTime
      appointmentType
    }
  }
`;

export const QUERY_ALL_BOOKINGS_BY_USER = gql`
  query bookingsByUserId {
    userBookings {
      _id
      patientEmail
      patientDOB
      patientName
      patientContactNumber
      clinicName
      doctorId
      doctorName
      userId
      bookingDate
      apptDateTime
      appointmentType
    }
  }
`;

export const QUERY_ALL_APPOINTMENTS_DOCTOR = gql`
  query doctorAppointments($doctorId: String!) {
    doctorAppointments(doctorId: $doctorId) {
      patientEmail
      patientDOB
      patientName
      patientContactNumber
      clinicName
      doctorId
      doctorName
      userId
      bookingDate
      apptDateTime
      appointmentType
    }
  }
`;
