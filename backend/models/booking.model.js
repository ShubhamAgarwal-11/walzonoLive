const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
        index: true
    },
    bookingDateTime: {
        type: Date,
        required: true
    },
    bookingStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
        default: 'Pending'
    },
    serviceType: {
        type: String,
        enum: ['Haircut', 'Massage', 'Facial', 'Other'], // Example, customize based on your business
        required: true
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true,
        index: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    bookingType: {
        type: String, 
        enum: ['Today Booking', 'Home Appointment', 'Salon Appointment'], 
        default: 'Today Booking'
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0 // Prevents negative values
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Ensure logical consistency before saving
bookingSchema.pre('save', function(next) {
    if (this.bookingStatus === 'Completed' && this.paymentStatus !== 'Completed') {
        return next(new Error('Payment must be completed before marking booking as Completed.'));
    }
    if (this.bookingStatus === 'Cancelled' && this.paymentStatus === 'Completed') {
        return next(new Error('Cancelled bookings cannot have a completed payment.'));
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
