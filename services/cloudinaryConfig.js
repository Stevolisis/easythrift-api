const cloudinary= require('cloudinary').v2;

cloudinary.config({
    cloud_name:'dwhkilbqk',
    api_key:'551128911534213',
    api_secret:'LSC0CEs8E5Bs5-Tbzrv5Y8s5Vw8',
    secure:false
});

module.exports = { cloudinary };
// CLOUDINARY_CLOUD_NAME=dwhkilbqk
// CLOUDINARY_API_KEY=551128911534213
// CLOUDINARY_API_SECRET=LSC0CEs8E5Bs5-Tbzrv5Y8s5Vw8