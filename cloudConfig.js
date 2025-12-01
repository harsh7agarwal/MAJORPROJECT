const cloudinaryLib = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Check if cloudinary v2 is available
if (!cloudinaryLib.v2) {
	throw new Error(
		"Cloudinary v2 is not available. " +
		"Please install cloudinary v2: npm install cloudinary@^2.0.0 " +
		"Current version may be v1 which doesn't support .v2 API."
	);
}

// Validate required environment variables early to fail fast in deployment
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
	throw new Error(
		"Missing Cloudinary configuration. Please set CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET environment variables."
	);
}

// Configure cloudinary v2
cloudinaryLib.v2.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET,
});

// Verify uploader exists (required by multer-storage-cloudinary)
if (!cloudinaryLib.v2.uploader) {
	throw new Error(
		"Cloudinary uploader is not available. " +
		"This means cloudinary v2 is not properly installed. " +
		"Please run: npm uninstall cloudinary && npm install cloudinary@^2.0.0"
	);
}

const storage = new CloudinaryStorage({
	cloudinary: cloudinaryLib.v2,
	params: async (req, file) => {
		return {
			folder: "wanderlust_DEV",
			allowed_formats: ["png", "jpg", "jpeg"],
		};
	},
});

module.exports = { cloudinary: cloudinaryLib.v2, storage };
