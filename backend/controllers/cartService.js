const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");

const calcTotalCartPrice = async (cart) => {
  let totalPrice = 0;
  cart.products.forEach((prod) => {
    const price = prod.priceAfterDiscount
      ? prod.priceAfterDiscount
      : prod.price;
    totalPrice += price * prod.count;
  });

  cart.totalCartPrice = totalPrice;
  cart.totalAfterDiscount = undefined;
  cart.coupon = undefined;

  await cart.save();

  return totalPrice;
};



// @desc      Add product to cart
// @route     POST /api/v1/cart
// @access    Private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;

  const product = await Product.findById(productId);

  // 1) Check if there is cart for logged user
  let cart = await Cart.findOne({ cartOwner: req.user._id });

  if (cart) {
    // 2) check if product exists for user cart
    const itemIndex = cart.products.findIndex(
      (p) =>
        p.product.toString() === req.body.productId &&
        p.color === req.body.color
    );
    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      const productItem = cart.products[itemIndex];
      productItem.count += 1;
      cart.products[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.products.push({
        product: productId,
        color,
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount,
      });
    }
  } else {
    cart = await Cart.create({
      cartOwner: req.user._id,
      products: [
        {
          product: productId,
          color,
          price: product.price,
          priceAfterDiscount: product.priceAfterDiscount,
        },
      ],
    });
  }

  await calcTotalCartPrice(cart);

  return res.status(200).json({
    status: "success",
    message: "Product added successfully to your cart",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});

// @desc      Update product quantity
// @route     Put /api/v1/cart/:itemId
// @access    Private/User
exports.updateCartProductCount = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { count } = req.body;

  const cart = await Cart.findOne({ cartOwner: req.user._id })
    .populate({
      path: "products.product",
      select: "title imageCover ratingsAverage brand category ",
      populate: { path: "brand", select: "name -_id", model: "Brand" },
    })
    .populate({
      path: "products.product",
      select: "title imageCover ratingsAverage brand category",
      populate: { path: "category", select: "name -_id", model: "Category" },
    });

  if (!cart) {
    return next(
      new ApiError(`No cart exists for this user: ${req.user._id}`, 404)
    );
  }

  const itemIndex = cart.products.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex > -1) {
    //product exists in the cart, update the quantity
    const productItem = cart.products[itemIndex];
    productItem.count = count;
    cart.products[itemIndex] = productItem;
  } else {
    return next(
      new ApiError(`No Product Cart item found for this id: ${itemId}`)
    );
  }

  await calcTotalCartPrice(cart);

  return res.status(200).json({
    status: "success",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});

exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ cartOwner: req.user._id })
    .populate({
      path: "products.product",
      select:
        "title images imageCover ratingsAverage brand category availableColors", // Include availableColors field
      populate: { path: "brand", select: "name -_id", model: "Brand" },
    })
    .populate({
      path: "products.product",
      select:
        "title images imageCover ratingsAverage brand category availableColors price priceAfterDiscount", // Include priceAfterDiscount field
      populate: { path: "category", select: "name -_id", model: "Category" },
    });

  if (!cart) {
    return next(
      new ApiError(`No cart exist for this user: ${req.user._id}`, 404)
    );
  }

  // // Set image URLs for products in the cart
  // cart.products.forEach((product) => {
  //   setImageUrl(product.product); // Assuming the product has an "images" array
  // });

  return res.status(200).json({
    status: "success",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});

// @desc      Remove product from cart
// @route     DELETE /api/v1/cart/:itemId
// @access    Private/User
exports.removeCartProduct = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const cart = await Cart.findOneAndUpdate(
    { cartOwner: req.user._id },
    {
      $pull: { products: { _id: itemId } },
    },
    { new: true }
  );

  // Calculate total cart price
  await calcTotalCartPrice(cart);

  return res.status(200).json({
    status: "success",
    numOfCartItems: cart.products.length,
    data: cart,
  });
});

// @desc      Clear logged user cart
// @route     DELETE /api/v1/cart
// @access    Private/User
exports.clearLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ cartOwner: req.user._id });

  if (!cart) {
    return res.status(204).send(); // No cart found, return success
  }

  // Remove all products from the cart
  cart.products = [];

  cart.totalCartPrice = 0;
  cart.totalAfterDiscount = undefined;
  cart.coupon = undefined;

  await cart.save(); // Save the cart without any products

  return res.status(204).send(); // Send success response
});

// @desc      Apply coupon logged user cart
// @route     PUT /api/v1/cart/applyCoupon
// @access    Private/User
exports.applyCouponToCart = asyncHandler(async (req, res, next) => {
  const { couponName } = req.body;

  // 2) Get current user cart
  const cart = await Cart.findOne({ cartOwner: req.user._id })
    .populate({
      path: "products.product",
      select: "title images imageCover ratingsAverage brand category ",
      populate: { path: "brand", select: "name -_id", model: "Brand" },
    })
    .populate({
      path: "products.product",
      select: "title images imageCover ratingsAverage brand category",
      populate: { path: "category", select: "name -_id", model: "Category" },
    });

  // 1) Get coupon based on it's unique name and expire > date.now
  const coupon = await Coupon.findOne({
    name: couponName,
    expire: { $gt: Date.now() },
  });
  if (!coupon) {
    cart.totalAfterDiscount = undefined;
    cart.coupon = undefined;
    await cart.save();
    return next(new ApiError("Coupon is invalid or has expired", 400));
  }

  const totalPrice = await calcTotalCartPrice(cart);

  const totalAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalAfterDiscount = totalAfterDiscount;
  cart.coupon = coupon.name;

  await cart.save();

  return res.status(200).json({
    status: "success",
    numOfCartItems: cart.products.length,
    coupon: coupon.name,
    data: cart,
  });
});
