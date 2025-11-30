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
<<<<<<< HEAD
	params: async (req, file) => ({
=======
params: async (req, file) => ({
>>>>>>> 84a2b67b4bea7bd9ae21e3fd2b4c9467642f2501
		folder: "wanderlust_DEV",
		// Support both keys depending on library version
		allowed_formats: ["png", "jpg", "jpeg"],
	}),
});

<<<<<<< HEAD
module.exports = { cloudinary, storage };
=======
module.exports = { cloudinary, storage };
>>>>>>> 84a2b67b4bea7bd9ae21e3fd2b4c9467642f2501
