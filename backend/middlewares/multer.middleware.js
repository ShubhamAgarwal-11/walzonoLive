const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp_images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }    
  });


  export const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 10 * 1024 * 1024, // 10MB max field size
      fileSize: 5 * 1024 * 1024, // 5MB max file size (adjust as needed)
    },
  });