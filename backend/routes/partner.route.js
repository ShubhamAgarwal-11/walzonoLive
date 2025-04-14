const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/multer.middleware');
const partnerController = require('../controllers/partner.controller');


// partner routes
router.post('/partner-register',upload.fields([
    {
        name: 'parlourImage', maxCount: 1
    }
]),partnerController.RegisterPartners);

router.post('/partnerLoginOTP',partnerController.PartnerLoginOTPSend);
router.post('/PartnerLoginOTPVerify',partnerController.PartnerLoginOTPVerify);
router.post('/partnerProfile',partnerController.PartnerProfile);
router.put('/updatePartnerProfile',partnerController.updatePartnerProfile);
router.post('/partner/addServices',upload.fields([
    {
        name: 'serviceImage', maxCount: 1
    }
]),partnerController.addServices);

router.get('/partner/getServices',partnerController.getAllServicesOfSelectedPartner);
router.get('/getAllPartners',partnerController.getAllPartners);


module.exports = router;