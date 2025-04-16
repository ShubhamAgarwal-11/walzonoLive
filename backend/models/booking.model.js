const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String }
    },

    // Booking Type
    bookingType: {
        type: String,
        enum: ["Today's Booking", 'Home Appointment', 'Salon Appointment'],
        default: 'Today Booking',
        required: true
    },

    // Conditional Date & Time
    bookingDateTime: {
        type: Date,
        required: function () {
            return this.bookingType !== "Today's Booking";
        }
    },

    // Array of Services
    services: [{
        serviceName: { type: String, required: true },
        quantity: { type: Number, default: 1, min: 1 },
        serviceType: {
            type: String,
            // enum: ['Haircut', 'Massage', 'Facial', 'Other'],
            required: true
        },
        price: { type: Number, required: true, min: 0 }
    }],

    // Partner Info
    partnerInfo: {
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partner',
            required: true
        },
        name: { type: String, required: true },
        image: { type: String } // Could be a URL or a file path
    },

    // Booking Status
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

    // Total Price
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    // Optional Soft Delete
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// Validation Logic (if needed, can be refined further)
bookingSchema.pre('save', function(next) {
    if (this.bookingType !== 'Today Booking' && !this.bookingDateTime) {
        return next(new Error('Date and Time are required for Home or Salon Appointments.'));
    }

    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
