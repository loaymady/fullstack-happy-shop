const multer = require("multer");
const ApiError = require("../utils/apiError");

// Upload single image => method returns multer middleware
exports.uploadSingleImage = (fieldName) => {
  // Storage: store files in memory as Buffer objects
  const multerStorage = multer.memoryStorage();

  // File Filter: accept only images
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true); // Accept the file
    } else {
      cb(new ApiError("Only images are allowed", 400), false); // Reject the file
    }
  };

  // Create the multer upload middleware
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload.single(fieldName); // Return middleware for handling a single file upload
};
