const { cloudinary } = require('../services/cloudinaryConfig');

//------------Single Upload-------------
async function imgUpload(file) {
  try{ 
    console.log("ffffffff: ",file.size)
    const img=await cloudinary.uploader.upload(file.path);
        console.log("sssssss: ",img)

    return img;
  }catch(err){
    throw new Error('Error uploading image ', err.message);
  };
}

module.exports={ imgUpload };
