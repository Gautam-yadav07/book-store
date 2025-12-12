import { Media } from "../models/media-model.js";
import dotenv from "dotenv";
dotenv.config();

export const saveUploadedFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const newFile = new Media({
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
    buffer: file.buffer,  // multer memory storage only
    fileLocation: `${process.env.BACKEND_URL}/uploads/${file.filename}`,
  });

  return await newFile.save();
};
