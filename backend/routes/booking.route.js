const express = require('express');
const router = express.Router();
const blogController = require('../controllers/booking.controller');


// now put auth middleware here
router.post('/createBooking',blogController.createBooking);
router.get('/getAllBookings',blogController.getAllBookings);

module.exports = router;