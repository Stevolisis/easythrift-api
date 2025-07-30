const cloudinary= require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dqk14fu8t', 
    api_key: '621513292122877', 
    api_secret:'k5Y4xS-YpKmmLKl4-Jx2skdmfDg',
    secure:false
});

module.exports = { cloudinary };
//harmonicsub8