const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinaryConfig");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/imageUpload");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

exports.uploadCategoryImage = uploadSingleImage("image");

// Middleware to upload the image to Cloudinary and save the URL in the request body
exports.uploadToCloudinary = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded.");
    return next();
  }

  const ext = req.file.mimetype.split("/")[1];
  const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;

  cloudinary.uploader
    .upload_stream(
      {
        folder: "categories",
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

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Public
exports.getCategories = factory.getAll(Category);

// @desc      Get specific category by id
// @route     GET /api/v1/categories/:id
// @access    Public
exports.getCategory = factory.getOne(Category);

// @desc      Create category
// @route     POST /api/v1/categories
// @access    Private
exports.createCategory = factory.createOne(Category);

// @desc      Update category
// @route     PATCH /api/v1/categories/:id
// @access    Private
exports.updateCategory = factory.updateOne(Category);

// @desc     Delete category
// @route    DELETE /api/v1/categories/:id
// @access   Private
exports.deleteCategory = factory.deleteOne(Category);

exports.deleteAll = factory.deleteAll(Category);
