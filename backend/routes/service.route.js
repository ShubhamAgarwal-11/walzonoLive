const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

// it shows all the list of services based on gender "men", "women", "both"
router.get('/getBestServices', serviceController.getBestServices);


// it shows all the list of services by service name Like "makeup", "hair"
router.get('/getAllServicesByCategoryName',serviceController.getAllServicesByCategoryName)

// it shows all the list of services by service id
router.get('/getDetailsOfServiceByServiceId',serviceController.getDetailsOfServiceByServiceId)



module.exports = router;