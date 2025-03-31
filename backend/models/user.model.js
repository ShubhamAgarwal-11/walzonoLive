// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
    },    
    userLiveLocation : { type: [Number], index: '2dsphere' },
    bookingId : { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('User', userSchema);
