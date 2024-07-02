const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// Storage
const multerStorage = multer.memoryStorage();

// Accept only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("only images allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

exports.uploadToCloudinary = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const ext = req.files.imageCover[0].mimetype.split("/")[1];
    const imageCoverFilename = `products-${uuidv4()}-${Date.now()}-cover.${ext}`;
    cloudinary.uploader
      .upload_stream(
        {
          folder: "products",
          public_id: imageCoverFilename,
          format: ext,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error: ", error);
            return next(new ApiError("Image upload failed", 500));
          }
          req.body.imageCover = result.secure_url;
          next();
        }
      )
      .end(req.files.imageCover[0].buffer);
  } else {
    next();
  }
});

exports.uploadToCloudinaryImages = asyncHandler(async (req, res, next) => {
  req.body.images = req.body.images || [];
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const ext = img.mimetype.split("/")[1];
        const filename = `products-${uuidv4()}-${Date.now()}-${
          index + 1
        }.${ext}`;
        cloudinary.uploader
          .upload_stream(
            {
              folder: "products",
              public_id: filename,
              format: ext,
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error: ", error);
                return next(new ApiError("Image upload failed", 500));
              }
              req.body.images.push(result.secure_url);
              if (index === req.files.images.length - 1) {
                next();
              }
            }
          )
          .end(img.buffer);
      })
    );
  } else {
    next();
  }
});

// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc      Get specific product by id
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = factory.getOne(Product, "reviews");

// @desc      Create product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = factory.createOne(Product);

// @desc      Update product
// @route     PATCH /api/v1/products/:id
// @access    Private
exports.updateProduct = factory.updateOne(Product);

// @desc     Delete product
// @route    DELETE /api/v1/products/:id
// @access   Private
exports.deleteProduct = factory.deleteOne(Product);
