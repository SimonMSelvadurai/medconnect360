import { gql } from '@apollo/client';

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
  query bookingById($bookingId: String!) {
    bookingById(bookingId: $bookingId) {
      bookingId
      email
      dob
      patientName
      contactNumber
      clinicName
      doctorId
      userId
      bookingDate
      apptDateTime
      appointmentType
      }
  }
`;

export const QUERY_ALL_BOOKINGS_BY_USER_ID = gql`
  query bookingsByUserId {
    userBookings {
      bookingId
      email
      dob
      patientName
      contactNumber
      clinicName
     doctorId
      userId
      bookingDate
      apptDateTime
      appointmentType
      }
  }
`;