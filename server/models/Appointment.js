const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false
  },
bookingStatus: {
type: String,
default:'PENDING'
},
bookingDate: {
  type: String,
  required: false
},
apptDate :{
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false
},
isTeleHealth:{
  type: Boolean,
  required:true,
  default:false
},
clinicName: {
  type: String,
  required: false
},
clinicAddress: {
  type: String,
  required: false
},
});


const Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;