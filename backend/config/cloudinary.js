const { v2 } = require('cloudinary');
const fs = require('fs');

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return;
    
    // Upload the file to Cloudinary
    const response = await v2.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    console.log(response.url);
    return response;
  } catch (error) {
    // Remove the temp file if upload fails
    fs.unlinkSync(filePath);
    return null;
  }
};

// ✅ CommonJS export
module.exports = { uploadOnCloudinary };
