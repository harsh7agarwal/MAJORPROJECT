let cloudinaryLib = require("cloudinary");
// Prefer v2 export when available, else fallback to default export
const cloudinary = cloudinaryLib.v2 || cloudinaryLib;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Validate required environment variables early to fail fast in deployment
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
	throw new Error(
		"Missing Cloudinary configuration. Please set CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET environment variables."
	);
}

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: async (req, file) => ({
		folder: "wanderlust_DEV",
		// Support both keys depending on library version
		allowed_formats: ["png", "jpg", "jpeg"],
	}),
});

module.exports = { cloudinary, storage };