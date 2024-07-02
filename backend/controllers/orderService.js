const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");



// @desc    Create new order
// @route   POST /api/orders/cartId
// @access  Private/Protected/User
exports.createCashOrder = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get logged user cart
  const cart = await Cart.findById(req.params.cartId).populate({
    path: "products.product",
    select:
      "title images imageCover ratingsAverage brand category availableColors price priceAfterDiscount",
    populate: [
      { path: "brand", select: "name -_id", model: "Brand" },
      { path: "category", select: "name -_id", model: "Category" },
    ],
  });

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user :${req.user._id}`, 404)
    );
  }

  // 2) Check if there is coupon apply
  const cartPrice = cart.totalAfterDiscount
    ? cart.totalAfterDiscount
    : cart.totalCartPrice;

  // 3) Create order with default cash option
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.products,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice: taxPrice + shippingPrice + cartPrice,
  });

  // 4) After creating order decrement product quantity, increment sold
  if (order) {
    const bulkOption = cart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));

    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart without deleting it
    cart.products = [];
    cart.totalCartPrice = 0;
    cart.totalAfterDiscount = undefined;
    cart.coupon = undefined;

    await cart.save();
  }

  res.status(201).json({ status: "success", data: order });
});

// @desc    Get Specific order
// @route   GET /api/orders/:id
// @access  Private/Protected/User-Admin
exports.getSpecificOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "cartItems.product",
    select:
      "title images imageCover ratingsAverage brand category availableColors price priceAfterDiscount",
  });

  if (!order) {
    return next(new ApiError(`No order found with that ID`, 404));
  }

  // // Set image URLs for products in the order
  // order.cartItems.forEach((item) => {
  //   setImageUrl(item.product);
  // });

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.filterOrdersForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObject = { user: req.user._id };
  next();
});

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private/Protected/User-Admin
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  // Define the pagination variables
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Fetch orders with pagination
  const orders = await Order.find(req.filterObject)
    .skip(skip)
    .sort({ createdAt: -1 }) // This sorts the orders in descending order by creation date
    .limit(limit)
    .populate({
      path: "cartItems.product",
      select:
        "title images imageCover ratingsAverage brand category availableColors price priceAfterDiscount",
    });

  // // Set image URLs for products in each order
  // orders.forEach((order) => {
  //   order.cartItems.forEach((item) => {
  //     setImageUrl(item.product);
  //   });
  // });

  // Get the total count of documents
  const count = await Order.countDocuments(req.filterObject);

  // Calculate the total number of pages
  const numberOfPages = Math.ceil(count / limit);

  res.status(200).json({
    status: "success",
    results: orders.length,
    paginationResult: {
      currentPage: page,
      numberOfPages,
      limit,
      nextPage: page < numberOfPages ? page + 1 : null,
    },
    data: orders,
  });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Protected/User-Admin
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ApiError(`There is no order for this id: ${req.params.id}`, 404)
    );
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
  res.status(200).json({
    status: "Success",
    data: updatedOrder,
  });
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ApiError(`There is no order for this id: ${req.params.id}`, 404)
    );
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.status(200).json({ status: "Success", data: updatedOrder });
});

// @desc    Update order to not paid
// @route   PUT /api/orders/:id/notpaid
// @access  Private/Protected/User-Admin
exports.updateOrderToNotPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ApiError(`There is no order for this id: ${req.params.id}`, 404)
    );
  }

  order.isPaid = false;
  order.paidAt = undefined;

  const updatedOrder = await order.save();
  res.status(200).json({
    status: "Success",
    data: updatedOrder,
  });
});

// @desc    Update order to not delivered
// @route   PUT /api/orders/:id/notdelivered
// @access  Private/Admin
exports.updateOrderToNotDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ApiError(`There is no order for this id: ${req.params.id}`, 404)
    );
  }

  order.isDelivered = false;
  order.deliveredAt = undefined;

  const updatedOrder = await order.save();
  res.status(200).json({ status: "Success", data: updatedOrder });
});

// @desc    Create order checkout session
// @route   GET /api/orders/:cartId
// @access  Private/User
exports.checkoutSession = asyncHandler(async (req, res, next) => {
  // 1) Get the currently cart
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user :${req.user._id}`, 404)
    );
  }

  // 2) Get cart price, Check if there is coupon apply
  const cartPrice = cart.totalAfterDiscount
    ? cart.totalAfterDiscount
    : cart.totalCartPrice;

  // 3) Create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        name: req.user.name,
        amount: cartPrice * 100,
        currency: "egp",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/user/allorders`,
    cancel_url: `http://localhost:3000/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  res.status(200).json({
    status: "success",
    session,
  });
});

const createOrderCheckout = async (session) => {
  try {
    // 1) Get needed data from session
    const cartId = session.client_reference_id;
    const checkoutAmount = session.display_items[0].amount / 100;
    const shippingAddress = session.metadata;

    // 2) Get Cart and User
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const user = await User.findOne({ email: session.customer_email });
    if (!user) {
      throw new Error("User not found");
    }

    // 3) Create order
    const order = await Order.create({
      user: user._id,
      cartItems: cart.products,
      shippingAddress,
      totalOrderPrice: checkoutAmount,
      paymentMethodType: "card",
      isPaid: true,
      paidAt: Date.now(),
    });

    // 4) After creating order decrement product quantity, increment sold
    if (order) {
      const bulkOption = cart.products.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      }));

      await Product.bulkWrite(bulkOption, {});

      // 5) Clear cart without deleting it
      cart.products = [];
      cart.totalCartPrice = 0;
      cart.totalAfterDiscount = undefined;
      cart.coupon = undefined;

      await cart.save();
    }
  } catch (error) {
    console.error("Error creating order checkout:", error);
    // Handle the error as needed, such as logging or notifying an admin
  }
};

// @desc    This webhook will run when stipe payment successfully paid
// @route   PUT /webhook-checkout
// @access  From stripe
exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"].toString();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    createOrderCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};
