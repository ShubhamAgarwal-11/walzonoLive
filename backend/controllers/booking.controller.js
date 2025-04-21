const Booking = require('../models/booking.model');
const Service = require('../models/services.model');
const User = require('../models/user.model');
const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);
const mongoose = require('mongoose');
const sendEmail  = require('../config/mailer');
const generateOrderNotificationEmail = require("../emails/EmailForPartnerBookingConfirm");

exports.createBooking = async (req, res) => {
    try {
        const data = req.body;

        // Validate userInfo
        if (!data.userInfo || !data.userInfo.name || !data.userInfo.phone || !data.userInfo.address) {
            return res.status(400).json({ success : false, message: 'Invalid or missing user information.' });
        }

        // Validate services array
        if (!Array.isArray(data.services) || data.services.length === 0) {
            return res.status(400).json({success : false, message: 'At least one service is required.' });
        }

        // Validate paymentMethod
        if (!['COD', 'Online'].includes(data.paymentMethod)) {
            return res.status(400).json({success : false, message: 'Invalid payment method. Must be COD or Online.' });
        }

        // Validate each service
        for (const service of data.services) {
            if (!isValidObjectId(service.serviceId)) {
                return res.status(400).json({success : false, message: 'Invalid serviceId in one of the services.' });
            }

            const serviceData = await Service.findById(service.serviceId);
            if (!serviceData) {
                return res.status(400).json({ 
                    success : false,
                    message: `Some Problem with ${service.serviceName}this service.` ,
                    serviceId: service.serviceId,
                    serviceName: service.serviceName
                });
            }

            if (!service.serviceName || service.price == null || !service.serviceType) {
                return res.status(400).json({success : false, message: 'Missing required fields in service.' });
            }

            if (service.price < 0 || (service.quantity && service.quantity < 1)) {
                return res.status(400).json({success : false, message: 'Invalid price or quantity in service.' });
            }

            if (!["Today's Booking", 'Home Appointment', 'Salon Appointment'].includes(service.bookingType)) {
                return res.status(400).json({success : false, message: 'Invalid bookingType in service.' });
            }

            if (service.bookingType !== "Today's Booking") {
                if (!service.bookingDate || !service.bookingTime) {
                    return res.status(400).json({success : false, message: 'bookingDate and bookingTime are required for scheduled bookings.' });
                }
            }

            const partner = service.partnerInfo;
            if (
                !partner ||
                !isValidObjectId(partner.partnerId) ||
                !partner.name
            ) {
                return res.status(400).json({success : false, message: 'Invalid or missing partnerInfo in service.' });
            }
        }

        // Calculate totalAmount if not provided
        if (!data.totalAmount || typeof data.totalAmount !== 'number') {
            data.totalAmount = data.services.reduce((sum, service) => {
                const quantity = service.quantity || 1;
                return sum + (service.price * quantity);
            }, 0);
        }

        // Create and save booking
        const newBooking = new Booking(data);
        await newBooking.save();

        // Update orderId in user
        const user = await User.findById(data.userInfo.userId);
        user.orderId.push(newBooking._id);
        await user.save();

        res.status(201).json({
            success : true,
            message: 'Order Placed',
            booking: newBooking
        });
    } catch (error) {
        console.error('Booking creation failed:', error);
        res.status(500).json({success : false, message: 'Internal server error', error: error.message });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({
            success: true,
            message: 'All Bookings',
            bookings: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.getAllBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Missing userId in parameters'
            });
        }

        const bookings = await Booking.find({ "userInfo.userId": userId })
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            message: 'All Bookings',
            bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.sendEmailToPartnerForConfirmBooking = async (req, res) => {
    try {
      const { newBookingInfo } = req.body;
    //   console.log("api hit");
  
      if (
        !newBookingInfo ||
        !newBookingInfo.services ||
        !Array.isArray(newBookingInfo.services) ||
        newBookingInfo.services.length === 0 ||
        !newBookingInfo.userInfo
      ) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields in booking information.',
        });
      }
  
      const service = newBookingInfo.services[0];
      const partnerInfo = service.partnerInfo;
  
      if (!partnerInfo || !partnerInfo.email) {
        return res.status(400).json({
          success: false,
          message: 'Partner information is incomplete.',
        });
      }
  
      const partnerName = partnerInfo.name;
      const partnerEmail = partnerInfo.email;
      const customerName = newBookingInfo.userInfo.name;
      const orderId = newBookingInfo._id;
      const orderDate = service.bookingDate;
      const orderTotal = service.price;
  
      const emailContent = generateOrderNotificationEmail({
        partnerName,
        customerName,
        orderId,
        orderDate,
        orderTotal
      });
  
    //   console.log('Email content:', emailContent);
      try {
        await sendEmail(partnerEmail, "New Booking Notification", emailContent);
      } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to send email"
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Email sent to partner successfully',
      });
  
    } catch (error) {
      console.error('Error sending email to partner:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };
  