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

export const QUERY_BOOKING_BY_ID = gql`
  query bookingById($bookingId: String!) {
    bookingById(bookingId: $bookingId) {
      email
      fullName
      contactNumber
      clinicName
      doctorId
      userId
      bookingDate
      appointmentType
      }
  }
`;



// export const QUERY_ALL_APPOINTMENT_USER = gql`
// query allAppointmentsById { $userId: String!) {
//   allAppointmentsById(userId: $userId) {
//     user:{user}
   
//   }
// }
// `;

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;