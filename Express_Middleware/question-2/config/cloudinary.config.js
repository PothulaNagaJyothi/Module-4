const cloudinary = require('cloudinary'); 
const multerStorage = require('multer-storage-cloudinary');
require('dotenv').config();

const CloudinaryStorage = multerStorage.CloudinaryStorage || multerStorage;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: {
    folder: 'user_profiles',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

module.exports = { cloudinary, storage };