const Partner = require('../models/partner.model');
const Profile = require('../models/partnerProfile');
const Service = require('../models/services.model');
const {uploadOnCloudinary} = require('../config/cloudinary');
const {emailTemplateForOTP} = require("../emails/EmailForOTP");
const sendEmail  = require('../config/mailer');

exports.RegisterPartners = async (req, res) => {
    try {
        const { parlourName, personName, email, phone, address  } = req.body;
        // console.log(req.body);
        if(!parlourName || !personName || !email || !phone || !address){
            return res.status(400).json({
                success: false, 
                message: "All fields are required."
            });
        }
        const existingPartner = await Partner.findOne({ $or: [{ email }, { phone }] });
        if (existingPartner) {
            return res.status(400).json({
                success: false,
                message: "Partner already exists with this email or phone number."
            });
        }

        // console.log(req.files.parlourImage[0].path);
        const parlourImage = req.files.parlourImage[0].path;

        if (!parlourImage) {
            return res.status(400).json({
                success: false,
                message: "Parlour image is required."
            });
        }

        const uploadedImage = await uploadOnCloudinary(parlourImage);
        if (!uploadedImage) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image on cloudinary."
            });
        }
        // const partner = await Partner.create({ 
        //     parlourName,
        //     personName, 
        //     email, 
        //     phone, 
        //     address,
        //     parlourImage: uploadedImage.url,
        //     // OTP : null,
        //     // OTPExpiry : null
        // });

        const partner = new Partner({
            parlourName,
            personName,
            email,
            phone,
            address,
            parlourImage: uploadedImage.url
        });

        await partner.save();
        // console.log(partner);
        if (!partner) {
            return res.status(400).json({
                success: false,
                message: "Error while registering partner."
            });
        }

        // console.log(partner);

        return res.status(200).json({
            success: true,
            message: "Partner registered successfully.",
            partnerInfo : partner
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

exports.PartnerLoginOTPSend = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }
        const partner = await Partner.findOne({email});
        if(!partner){
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const htmlContent = emailTemplateForOTP(OTP, partner.personName);
       
        try {
            await sendEmail(email, "Login OTP for Partner's Dashboard", htmlContent);
            // res.status(200).json({ success: "Email sent successfully" });
        } catch (error) {
            return res.status(500).json({ 
                success: false,
                error: "Failed to send email"
            });
        }

        partner.OTP = OTP;
        await partner.save();

        return res.status(200).json({
            success: true,
            message: "OTP Send Successfully.",
            partnerInfo: partner
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

exports.PartnerLoginOTPVerify = async (req, res) => {
    try {
        const {email,OTP} = req.body;
        if(!email || !OTP){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        // console.log(req.body);
        const partner = await Partner.findOne({email});
        if(!partner){
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }
        if(partner.OTP !== OTP){
            return res.status(403).json({
                success: false,
                message: "Invalid OTP."
            });
        }
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
            partnerInfo: partner
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}   

exports.PartnerProfile = async (req, res) => {
    try{
        const { partnerId, panNo, panName, bankName, bankAccountNo, ifscCode, gstNo, openingTime, closingTime, openingDays } = req.body;
        if(!partnerId || !panNo || !panName || !bankName || !bankAccountNo || !ifscCode || !gstNo || !openingTime || !closingTime || !openingDays){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const partner = await Partner.findById(partnerId);
        if(!partner){
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }

        // check if PAN already exists
        const PAN = await Profile.findOne({panNo});
        if(PAN){
            return res.status(400).json({
                success: false,
                message: "PAN already exists."
            });
        }

        // check if GST already exists
        const GST = await Profile.findOne({gstNo});
        if(GST){
            return res.status(400).json({
                success: false,
                message: "GST already exists."
            });
        }

    // Create new profile
    const profile = new Profile({ partnerId, panNo, panName, bankName, bankAccountNo, ifscCode, gstNo, openingTime, closingTime, openingDays });
    await profile.save();

    // Link profile to partner
    partner.profile = profile._id;
    await partner.save();

    return res.status(200).json({
        success: true,
        message: "Profile created successfully.",
        profileInfo: profile
    });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

exports.updatePartnerProfile = async (req, res) => {
    try{
        const { partnerId, panNo, panName, bankName, bankAccountNo, ifscCode, gstNo, openingTime, closingTime, openingDays } = req.body;
        if(!partnerId || !panNo || !panName || !bankName || !bankAccountNo || !ifscCode || !gstNo || !openingTime || !closingTime || !openingDays){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const partner = await Partner.findById(partnerId);
        if(!partner){
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }

        const profile = await Profile
            .findOneAndUpdate({ partnerId }, { panNo, panName, bankName, bankAccountNo, ifscCode, gstNo, openingTime, closingTime, openingDays }, { new: true });

        if(!profile){
            return res.status(400).json({
                success: false,
                message: "Error while updating profile."
            });
        }
        

        // Link profile to partner
        partner.profile = profile._id;
        await partner.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profileInfo: profile
        });

        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal server error."
            });
        }
};


exports.addServices = async (req, res) => {
    try {
        const { partnerId, name, description, price, availableAtHome, serviceType , duration, serviceCategory } = req.body;
        // console.log(req.body);
        if (!partnerId || !name || !description || !price || !availableAtHome || !serviceType || !duration || !serviceCategory) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }
        // console.log(partner);

        const serviceImagePath = req?.files?.serviceImage[0]?.path;

        if (!serviceImagePath) {
            return res.status(400).json({
                success: false,
                message: "Service image is required."
            });
        }

        const uploadedImage = await uploadOnCloudinary(serviceImagePath);
        if (!uploadedImage) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image on cloudinary."
            });
        }

        let serviceTypes = serviceType.toLowerCase();

        const service = await Service.create({
            name,
            description,
            price,
            serviceImage: uploadedImage.url,
            partnerId: partner._id,
            availableAtHome,
            serviceType : serviceTypes,
            duration,
            serviceCategory
        });

        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Error while adding service."
            });
        }

        partner.services.push(service._id);
        await partner.save();

        return res.status(200).json({
            success: true,
            message: "Service added successfully.",
            serviceInfo: service
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


exports.getAllServicesOfSelectedPartner = async (req, res) => {
    try {
        const partnerId = req.query.partnerId; 
        if (!partnerId) {
            return res.status(400).json({
                success: false,
                message: "Partner id is required."
            });
        }
        // console.log(req.body);
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(400).json({
                success: false,
                message: "Partner not found."
            });
        }
        const services = await Partner.findById(partnerId).populate('services');
        if (!services) {
            return res.status(400).json({
                success: false,
                message: "No services found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Services found.",
            services: services.services,
            parlourName : partner.parlourName
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


exports.getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find();

        if (partners.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No partners found"
            });
        }

        const top5Partners = partners.slice(0, 5); // Get first 5 from array

        return res.status(200).json({
            success: true,
            allPartners: partners,
            top5Partners: top5Partners
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}
