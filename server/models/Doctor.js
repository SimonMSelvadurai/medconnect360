const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const doctorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  clinicName: {
    type: String,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
},
  education: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  bookings: [
    {
      booking: {
          type: Schema.Types.ObjectId,
          ref: 'Booking'
      },
    }]
});

// set up pre-save middleware to create password
doctorSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
doctorSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
