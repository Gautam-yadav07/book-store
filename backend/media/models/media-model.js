import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
	{
		fieldname: { type: String, required: true },
		originalname: { type: String, required: true },
		mimetype: { type: String, required: true },
		size: { type: Number, required: true },
		destination: { type: String, required: true },
		filename: { type: String, required: true },
		path: { type: String, required: true },
		buffer: { type: Buffer },
		fileLocation: { type: String },
	},
	{
		timestamps: true,
	}
);

export const Media = mongoose.model("Media", mediaSchema);
