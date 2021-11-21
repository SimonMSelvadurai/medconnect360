const { AuthenticationError } = require("apollo-server-express");
const e = require("cors");
const { EmailAddressMock } = require("graphql-scalars");
const { User, Doctor, Booking } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");

const resolvers = {
  Query: {
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
        return Booking.find({ userId: context.user._id }).sort({
          apptDateTime: -1,
        });
      }
      throw new AuthenticationError("Not logged in as User");
    },
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

    bookingById: async (parent, { bookingId }, context) => {
      const booking = await Booking.findById(bookingId);
      return booking;
    },

    doctorAppointments: async (parent, { doctorId }, context) => {
      console.log("resolvers.js : doctorAppointments : doctorId", doctorId);
      console.log("resolvers.js : doctorAppointments :  context", doctorId);
      console.log("resolvers.js : doctorAppointments :  parent", parent);

      if (doctorId != null) {
        const params = {};
        params.doctorId = {
          $regex: doctorId,
        };
        return Booking.find(params).sort({ apptDateTime: -1 });
      }
      throw new AuthenticationError("Not logged in as Doctor");
    },
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

    addBooking: async (parent, args) => {
      console.log("addBooking : argsargs", args);
      const newBooking = await Booking.create(args);
      console.log("newBooking : ", newBooking);
      await User.findByIdAndUpdate(args.userId, {
        $push: { bookings: newBooking },
      });
      await Doctor.findByIdAndUpdate(args.doctorId, {
        $push: { bookings: newBooking },
      });

      return newBooking;
    },

    removeBooking: async (parent, { bookingId }) => {
      var id = mongoose.Types.ObjectId(bookingId);
      return Booking.findByIdAndDelete(id);
    },

    updateBooking: async (parent, args, context) => {
      var id = mongoose.Types.ObjectId(args.bookingId);
      console.log("updateBooking : id", id);

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
