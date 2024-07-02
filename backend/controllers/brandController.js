const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/imageUpload");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// Middleware to handle single image upload for 'image' field
exports.uploadBrandImage = uploadSingleImage("image");

// Middleware to upload the image to Cloudinary and save the URL in the request body
exports.uploadToCloudinary = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded.");
    return next();
  }

  const ext = req.file.mimetype.split("/")[1];
  const filename = `brand-${uuidv4()}-${Date.now()}.${ext}`;

  cloudinary.uploader
    .upload_stream(
      {
        folder: "brands",
        public_id: filename,
        format: ext,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error: ", error);
          return next(new ApiError("Image upload failed", 500));
        }
        console.log("Cloudinary upload result: ", result);
        req.body.image = result.secure_url;
        next();
      }
    )
    .end(req.file.buffer);
});

// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = factory.getAll(Brand);

// @desc      Get specific brand by id
// @route     GET /api/v1/brands/:id
// @access    Public
exports.getBrand = factory.getOne(Brand);

// @desc      Create brand
// @route     POST /api/v1/brands
// @access    Private
exports.createBrand = factory.createOne(Brand);

// @desc      Update brand
// @route     PATCH /api/v1/brands/:id
// @access    Private
exports.updateBrand = factory.updateOne(Brand);

// @desc     Delete brand
// @route    DELETE /api/v1/brands/:id
// @access   Private
exports.deleteBrand = factory.deleteOne(Brand);

exports.deleteAll = factory.deleteAll(Brand);
