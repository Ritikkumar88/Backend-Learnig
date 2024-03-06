import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDNINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNINARY_API_KEY, 
  api_secret: process.env.CLOUDNINARY_API_SECRET 
});


const uploadOnCloudinary = async (loaclFilePath) => {
    try {
        if(!loaclFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(loaclFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploade on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(loaclFilePath) // remove the locally seved temprary file as the upload opration got failed
    }
}

export {uploadOnCloudinary};