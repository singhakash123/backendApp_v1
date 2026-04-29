import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const unlinkFileHelper = async (filePath) => {
  try {
    if (!filePath) return;

    await fs.unlink(filePath);
    console.log(`🗑️ File removed: ${filePath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`⚠️ File not found: ${filePath}`);
    } else {
      console.error(`❌ Failed to delete file: ${filePath}`, error.message);
    }
  }
};

export const uploadOnCloudinary = async (
  localFilePath,
  folderName = "uploads"
) => {
  try {
    if (!localFilePath) {
      console.warn("⚠️ No file path provided for upload");
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    });

    // cleanup (non-blocking)
    unlinkFileHelper(localFilePath);

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    // cleanup even if upload fails
    unlinkFileHelper(localFilePath);

    return null; // IMPORTANT
  }
};
