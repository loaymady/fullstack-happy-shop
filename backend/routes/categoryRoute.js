const express = require("express");
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  uploadToCloudinary,
  deleteAll,
} = require("../controllers/categoryController");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const authController = require("../controllers/authController");

const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    authController.auth,
    authController.allowedTo("admin", "manager"),
    uploadCategoryImage,
    uploadToCloudinary,
    createCategoryValidator,
    createCategory
  )
  .delete(deleteAll);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    authController.auth,
    authController.allowedTo("admin", "manager"),
    uploadCategoryImage,
    uploadToCloudinary,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authController.auth,
    authController.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
