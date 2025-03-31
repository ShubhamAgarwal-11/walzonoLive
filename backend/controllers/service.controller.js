const Booking = require('../models/booking.model');
const Service = require('../models/services.model');

// exports.getBestServices = async (req, res) => {
//     try {
//         // Step 1: Count total bookings per service
//         const bookedServices = await Booking.aggregate([
//             { $group: { _id: "$serviceId", count: { $sum: 1 } } },
//             { $sort: { count: -1 } } // Sort by highest bookings
//         ]);

//         let serviceRanking = {}; // Store service counts
//         bookedServices.forEach(service => {
//             serviceRanking[service._id] = service.count;
//         });

//         // Step 2: Fetch all services without checking status
//         const allServices = await Service.find();

//         // console.log("allServices", allServices);
//         // console.log("serviceRanking", serviceRanking);

//         let menServices = [];
//         let womenServices = [];

//         allServices.forEach(service => {
//             let count = serviceRanking[service._id] || 0; // Default booking count = 0
//             let serviceData = { ...service.toObject(), bookingCount: count };

//             if (service.category === "Men's" || service.category === "Both") {
//                 menServices.push(serviceData);
//             }
//             if (service.category === "Women's" || service.category === "Both") {
//                 womenServices.push(serviceData);
//             }
//         });

//         // Step 3: Sort services based on booking count (if bookings exist)
//         menServices.sort((a, b) => b.bookingCount - a.bookingCount);
//         womenServices.sort((a, b) => b.bookingCount - a.bookingCount);

//         res.json({
//             success: true,
//             menServices,
//             womenServices
//         });

//     } catch (error) {
//         console.error("Error fetching best services:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };


exports.getBestServices = async(req,res)=>{
    try {
        
        const menServices = await Service.find({serviceCategory : "Men's"}).sort({bookingCount : -1}).limit(5)
        const womenServices = await Service.find({serviceCategory : "Women's"}).sort({bookingCount : -1}).limit(5)
        const bothServices = await Service.find({serviceCategory : "Both"}).sort({bookingCount : -1}).limit(5)
        menServices.push(...bothServices)
        womenServices.push(...bothServices)

        return res.status(200).json({
            success : true,
            menServices : menServices,
            womenServices : womenServices
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while fetching best services.",
            error : error.message
        })
    }
}


exports.getAllServicesByCategoryName = async(req,res)=>{
    try {
        let {service} = req.query;
        console.log(service)
        service = service.toLowerCase();
        // console.log(service)
        const services = await Service.find({serviceType : service}).populate('partnerId')
        if(!services){
            return res.status(400).json({
                success : false,
                message : "service not found in this category"
            })
        }



        return res.status(200).json({
            success : true,
            message : "service found",
            services : services
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


exports.getDetailsOfServiceByServiceId = async(req,res)=>{

    try {
        const {serviceId} = req.query;
        const service = await Service.findById(serviceId).populate('partnerId')
        if(!service){
            return res.status(400).json({
                success : false,
                message : "service not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "service found",
            service : service
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
    
}