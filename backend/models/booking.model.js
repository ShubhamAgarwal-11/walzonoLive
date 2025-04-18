const mongoose = require('mongoose');

// Service-level schema
const serviceSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    serviceName: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, min: 0 },
    serviceImage: { type: String },
    serviceType: { type: String, required: true },

    // Booking Info at the Service Level
    bookingType: {
        type: String,
        enum: ["Today's Booking", 'Home Appointment', 'Salon Appointment'],
        required: true
    },
    bookingDate: {
        type: Date,
        required: function () {
            return this.bookingType !== "Today's Booking";
        }
    },
    bookingTime: {
        type: String,
        required: function () {
            return this.bookingType !== "Today's Booking";
        }
    },

    // Partner Info at the Service Level
    partnerInfo: {
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partner',
            required: true
        },
        name: { type: String, required: true },
        image: { type: String }
    }
}, { _id: false });

// Main Booking Schema
const bookingSchema = new mongoose.Schema({
    userInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

    services: {
        type: [serviceSchema],
        required: true,
        validate: v => Array.isArray(v) && v.length > 0
    },

    paymentMethod: {
        type: String,
        enum: ['COD', 'Online'],
        default : 'COD',
        required: true
    },

    bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
