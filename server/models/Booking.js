const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const bookingSchema = new Schema({
    
       appointmentType: {
          type: String,
          required: false,
          default: "Standard"
        },
        bookingDate: {
          type: String,
          default: Date.now,
        },
        clinicName: {
          type: String,
        },
        apptDateTime: {
          type: String,
          default: Date.now,
        },
        bookingStatus: {
          type: String,
          default: "Booked",
        },
        doctorId: {
          type: String,
          ref: "Doctor",
          required: true
        }, 
        doctorName: {
          type: String,
          ref: "Doctor",
        },       
        userId: {
          type: String,
          ref: "User",
          required: true
        },
        patientEmail: {
          type: String,
          required: true
        },
        patientDOB: {
          type: String,
          required: true,
          
        },        
        patientName: {
          type: String,
          required: true,
        },
        patientContactNumber: {
          type: String,
          required: true,
        },    
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;