const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  serviceImage: {
    type: String,
    required: true
  }, // URL or path to the image
  partnerId: {
    type: Schema.Types.ObjectId,
    ref: 'Partner', // This links back to the Partner schema
    required: true
  },
  availableAtHome: {
    type: Boolean,
    default: false,
    required: true
  },
  serviceType : {
    type : String,
    required : true
  },
  duration : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    default : 4
  },
  serviceCategory : {
    type: String,
    enum: ["Men's", "Women's", "Both"],  
    required: true
  },
  bookingCount : {
    type : Number,
    default : 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);