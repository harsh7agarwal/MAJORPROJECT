const cloudinaryLib = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Validate required environment variables early to fail fast in deployment
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
	throw new Error(
		"Missing Cloudinary configuration. Please set CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET environment variables."
	);
}

// Get cloudinary instance - prefer v2 API, fallback to default
const cloudinary = cloudinaryLib.v2 || cloudinaryLib;

if (!cloudinary) {
	throw new Error("Failed to initialize Cloudinary. Please check your cloudinary package installation.");
}

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET,
});

// Verify uploader is available (required by multer-storage-cloudinary)
if (!cloudinary.uploader) {
	throw new Error(
		"Cloudinary uploader is not available. " +
		"Please ensure you're using cloudinary v2 API. " +
		"Try: npm install cloudinary@^2.0.0"
	);
}

const storage = new CloudinaryStorage({
	cloudinary,
	params: async (req, file) => ({
		folder: "wanderlust_DEV",
		// Support both keys depending on library version
		allowed_formats: ["png", "jpg", "jpeg"],
	}),
});

module.exports = { cloudinary, storage };
