import { gql } from '@apollo/client';

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
    $email: String!,
    $password: String!,
    $dob:String!,
    $fullName: String!,
    $contactNumber: String!  
  ) {
    addUser(
      email: $email
      password: $password
      dob:$dob
      fullName:$fullName
      contactNumber:$contactNumber
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
    $email: String!,
    $dob:String!,
    $fullName: String!,
    $contactNumber: String!  
  ) {
    bookUser(
      email: $email
      dob:$dob
      fullName:$fullName
      contactNumber:$contactNumber
      ) 
  }
`;

export const ADD_DOCTOR = gql`
  mutation addDoctor(
    $email: String!,
    $password: String!,
    $fullName: String!,
    $contactNumber: String!,
    $regNo: String!,
    $education: String!,
    $clinicAddress: String!,
    $clinicName: String!,
    $specialization: String!
      ) {
    addDoctor(
      email: $email,
      password: $password,
      fullName: $fullName,
      contactNumber: $contactNumber,
      regNo: $regNo,
      education: $education,
      clinicAddress: $clinicAddress,
      clinicName: $clinicName,
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
  mutation addBooking($doctorId: ID!,
    $userId: ID,
    $bookingDate: String,
    $appointmentType: String,
    $clinicName: String
    ) {
          addBooking(
          doctorId: $doctorId
          userId:$userId
          bookingDate: $bookingDate,
          appointmentType: $appointmentType,
          clinicName: $clinicName
       )
       {
         _id
       }
          }
  
`;


// export const ADD_PROFILE = gql`
//   mutation addProfile($name: String!, $email: String!, $password: String!, $role: String!) {
//     addProfile(name: $name, email: $email, password: $password,role:$role) {
//       token
//       profile {
//         _id
//         name
//         role
//       }
//     }
//   }
// `;

// export const ADD_SKILL = gql`
//   mutation addSkill($profileId: ID!, $skill: String!) {
//     addSkill(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;


// export const REMOVE_SKILL = gql`
//   mutation removeSkill($skill: String!) {
//     removeSkill(skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;