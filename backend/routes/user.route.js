const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// user routes

router.post('/user-register',userController.register);
router.post('/login',userController.login);
router.post('/contact',userController.contactUs);
router.get('/logout',userController.logout);


module.exports = router;