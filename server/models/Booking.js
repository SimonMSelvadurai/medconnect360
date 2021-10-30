const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const bookingSchema = new Schema({
    

        // appointmentDate: {
        //   type: Date,
        // },
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
        // location: {
        //   type: String,
        // },
        time: {
          type: String,
          // required: true,
        },
        // bookingStatus: {
        //   type: String,
        //   default: "Booked",
        // },
        doctorId: {
          type: String,
          ref: "Doctor",
          //type: String,
          required: true
        },
        userId: {
          type: String,
          ref: "User",
          // type: String,
          required: true
        },
  

  // phoneNumber: {
  //   type: String,
  //   required: true
  //     },
  // regNo: {
  //   type: String,
  //   required: true
  //     },
  // clinicName: {
  //   type: String,
  //   required: true
  //     },
  // clinicAddress: {
  //   type: String,
  //   required: true    
  // },
  // education: {
  //   type: String,
  //   required: true    
  // },
  // Specialization: {
  //   type: String,
  //   required: true    
  // }
});

// // set up pre-save middleware to create password
// doctorSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // compare the incoming password with the hashed password
// doctorSchema.methods.isCorrectPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;