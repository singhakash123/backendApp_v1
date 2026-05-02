import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_CLOUD_API_KEY,
  api_secret: config.CLOUDINARY_CLOUD_API_SECRET,
});

// 🔥 helper
const removeFileAfterUploadOrError = async (filePath) => {
  try {
    if (filePath) {
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error("File delete error:", error.message);
  }
};

export const uploadOnCloudinary = async (
  localFilePath,
  folderName = "general"
) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto",
    });

    await removeFileAfterUploadOrError(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    await removeFileAfterUploadOrError(localFilePath);

    console.error("Cloudinary upload failed:", error.message);
    throw new Error("File upload failed"); // 🔥 important
  }
};
