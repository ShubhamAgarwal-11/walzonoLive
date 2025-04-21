const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');


// now put auth middleware here
router.post('/createBooking',bookingController.createBooking);
router.get('/getAllBookings',bookingController.getAllBookings);
router.get('/getAllBookingsByUserId/:userId',bookingController.getAllBookingsByUserId);
router.post('/sendEmailToPartnerForConfirmBooking',bookingController.sendEmailToPartnerForConfirmBooking)


module.exports = router;