const { AuthenticationError } = require("apollo-server-express");
const e = require("cors");
const { EmailAddressMock } = require("graphql-scalars");
const { User, Doctor, Booking } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require ('mongoose');
// const {GraphQLDateTime} = require('graphql-iso-date');
// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';

// const resolverMap = {
//   Date: new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     parseValue(value) {
//       return new Date(value); // value from the client
//     },
//     serialize(value) {
//       return value.getTime(); // value sent to the client
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         return new Date(ast.value) // ast value is always in string format
//       }
//       return null;
//     },
//   }),
// };

const resolvers = {
  //DateTime: GraphQLDateTime,
  Query: {
    // doctors: async () => {
    //   if (context.doctor || context.user) {Booking.find
    //      return await Doctor.find().fullName;
    //    }
    //    throw new AuthenticationError('Not logged in');
    //   },
    doctors: async () => {
      return Doctor.find();
    },

    userBookings: async (parent, args, context) => {
      if (context.user) {
        const userId = context.user._id;
        const params = {};

        params.userId = {
          $regex: userId,
        };
        return Booking.find({ userId: context.user._id }).sort({ apptDateTime: -1 });
     
      }
      throw new AuthenticationError("Not logged in as User");
    },
  //   doctorAppointments: async (parent, args, context) => {
  //   if(context.doctor) {
  //     const doctorId = context.doctor._id;
  //     const params = {};

  //     params.doctorId = {
  //       $regex: doctorId,
  //     };

  //   return Booking.find({ doctorId: context.doctor._id });
  //   }
  //   throw new AuthenticationError("Not logged in as User");
  // },
      // .sort({ createdAt: -1 })
      // .populate("doctor")
      // .populate({
      //   path: "doctor",
      //   populate: "doctor",
      // });

    // return Booking.find();

    // userBookings: async (parent, args, context) => {
    //   if (context.user) {
    //     const userId = context.user._id;
    //     const params = {};

    //    params.userId = {
    //         $regex: userId,
    //       };

    //    return Booking.find({userId: context.user._id}).sort({ createdAt: -1 });
    //  // return Booking.find();
    //   }
    //   throw new AuthenticationError("Not logged in as User");
    // },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    doctor: async (parent, args, context) => {
      if (context.doctor) {
        const doctor = await Doctor.findById(context.doctor._id);
        return doctor;
      }

      throw new AuthenticationError("Not logged in as Doc");
    },

    // oooooooooooo > booking: async (parent, { bookingId }, context) => {
    //   //if (context.doctor) {
    //   return await Booking.find();
    // },

    bookingById: async (parent, { bookingId }, context) => {
      const booking = await Booking.findById(bookingId);
      return booking;
    },

    // bookingsByUserId: async (parent, args, context) => {
    //   if (context.user) {
    //     const userId = context.user._id;
    //     return Booking.find();
    //   }
    //   throw new AuthenticationError("Not logged in as User");
    // },
      
    doctorAppointments: async (parent,  { doctorId }, context) => {
      //const doctorId = context.body.variables.doctorId;
      console.log("resolvers.js : doctorAppointments : doctorId" , doctorId );
      console.log("resolvers.js : doctorAppointments :  context" , doctorId);
      console.log("resolvers.js : doctorAppointments :  parent" , parent );
     
      if (doctorId != null) {
        const params = {};
      params.doctorId = {
        $regex: doctorId,
      };
        return Booking.find(params).sort({ apptDateTime: -1 });
      }
      throw new AuthenticationError("Not logged in as Doctor");
    },

    // doctorAppointments : async (parent, args, context) => {
    //   console.log("args.doctorId" , args.doctorId);
    //   const params = {};
    //   params.doctorId = {
    //     $regex: args.doctorId,
    //   };
    //   const bookings = await Booking.find(params);
    //   return bookings;
    // },
    doctorById: async (parent, args, context) => {
      const doctor = await Doctor.findById(args.doctorId);
      return doctor;
    },
    userById: async (parent, args, context) => {
      const user = await User.findById(args.userId);
      return user;
    },
    userByEmail: async (parent, { email }, context) => {
      const params = {};

      if (email) {
        params.email = {
          $regex: email,
        };
      }
      return await User.find(params);
    },

    appointmentsByUserId: async (parent, args, context) => {
      const user = await Appointment.findById(args.userId);
      return user;
    },

    // doctorNames: async (parent, args, context) => {

    //     const doctors = await Doctor.find(data && data.map(item =>{
    //       JSON.stringify(item.fullName);
    //     }) );
    //     return doctors;

    // },

    // doctorNames: async () => {
    //   return Doctor.find();
    // },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    bookUser: async (parent, args, context) => {
      if (context.user) {
        const user = User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      } else {
        const user = await User.create(args);
      }
      return null;
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    addDoctor: async (parent, args) => {
      const doctor = await Doctor.create(args);
      const token = signToken(doctor);

      return { token, doctor };
    },


    addBooking : async (parent,args)   => {
      console.log("addBooking : argsargs" , args);
      const newBooking = await Booking.create(args);
      console.log("newBooking : " , newBooking);
          // const newBooking = await Booking.create({
          //   doctorId: doctorId,
          //   doctorName: doctorName,
          //   userId: user._id,
          //   apptDateTime: apptDateTime,
          //   patientEmail: patientEmail,
          //   patientDOB: patientDOB,
          //   patientName: patientName,
          //   patientContactNumber: patientContactNumber,
          // });

          await User.findByIdAndUpdate(args.userId, {
                    $push: { bookings: newBooking },
                  });
                  await Doctor.findByIdAndUpdate(args.doctorId, {
                    $push: { bookings: newBooking },
                  });

            
          return newBooking ;

        },

    // addBooking: async (
    //   parent,
    //   { 
    //     patientEmail,
    //     patientDOB,
    //     patientName,
    //     patientContactNumber,
    //     doctorId,
    //     doctorName,
    //     apptDateTime,
    //   },
    //   context
    // ) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id);
    //     const booking = await Booking.findOneAndUpdate(
    //       { bookingId: bookingId },
    //       {
    //         doctorId: doctorId,
    //         doctorName: doctorName,
    //         userId: user._id,
    //         apptDateTime: apptDateTime,
    //         patientEmail: patientEmail,
    //         patientDOB: patientDOB,
    //         patientName: patientName,
    //         patientContactNumber: patientContactNumber,
    //       },
    //       {
    //         new: true,
    //       }
    //     );

    //     if (!booking) {
    //       const newBooking = await Booking.create({
    //         doctorId: doctorId,
    //         doctorName: doctorName,
    //         userId: user._id,
    //         apptDateTime: apptDateTime,
    //         patientEmail: patientEmail,
    //         patientDOB: patientDOB,
    //         patientName: patientName,
    //         patientContactNumber: patientContactNumber,
    //       });

    //       await User.findByIdAndUpdate(user._id, {
    //         $push: { bookings: newBooking },
    //       });
    //       await Doctor.findByIdAndUpdate(doctorId, {
    //         $push: { bookings: newBooking },
    //       });

    //       return newBooking;
    //     }
    //     return booking;
    //   }
    //   throw new AuthenticationError("Not logged in User");
    // },

    removeBooking: async (parent, {bookingId}) => {
      var id = mongoose.Types.ObjectId(bookingId);
      return Booking.findByIdAndDelete( id);
    },

    

    updateBooking: async (parent, args, context) => {
      var id = mongoose.Types.ObjectId(args.bookingId);
      console.log("updateBooking : id" , id);

        return await Booking.findByIdAndUpdate(id, args);
    },


    updateDoctor: async (parent, args, context) => {
      if (context.doctor) {
        return await Doctor.findByIdAndUpdate(context.doctor._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in Doctor");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    logindoc: async (parent, { email, password }) => {
      const doctor = await Doctor.findOne({ email });

      if (!doctor) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await doctor.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(doctor);

      return { token, doctor };
    },
  },
};

module.exports = resolvers;
