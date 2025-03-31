const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new Schema({
  parlourName: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  parlourImage: {
    type: String,
    required: true
  }, 

  OTP: {
    type: String,
    default: null,
    reuired: false
  },
  OTPExpiry: {
    type: Date,
    default: null,
    required: false
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile', // This will reference the Profile schema once it's created
    default: null,
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service', // This will reference the Service schema once it's created
  }],
  bookingId : {
    type : Schema.Types.ObjectId,
    ref : 'Booking'
  },
  paymentId : {
    type : Schema.Types.ObjectId,
    ref : 'Payment'
  },
  commissionRate : {
    type : Number
  },
  totalIncomeAmmount : {
    type : Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);