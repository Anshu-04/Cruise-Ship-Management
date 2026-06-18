import express from "express";
import Order from "../models/Order.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Create a new order/booking
// @route POST /api/orders
// @access Voyager only
router.post("/", protect, authorizeRoles("voyager"), async (req, res) => {
  const { type, details } = req.body;

  try {
    const newOrder = new Order({
      voyagerId: req.user.id,
      type,
      details,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Get own orders
// @route GET /api/orders/my-orders
// @access Voyager only
router.get("/my-orders", protect, authorizeRoles("voyager"), async (req, res) => {
  try {
    const orders = await Order.find({ voyagerId: req.user.id })
      .populate("assignedTo", "username email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Get orders
// @route GET /api/orders
// @access Admin (all orders) or Staff (assigned orders)
router.get("/", protect, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "staff") {
      query = { assignedTo: req.user.id };
    } else if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to access these orders" });
    }

    const orders = await Order.find(query)
      .populate("voyagerId", "username email")
      .populate("assignedTo", "username email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Assign order to staff
// @route PUT /api/orders/:id/assign
// @access Admin only
router.put("/:id/assign", protect, authorizeRoles("admin"), async (req, res) => {
  const { assignedTo } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.assignedTo = assignedTo || null;
    if (assignedTo) {
      order.assignedAt = new Date();
      order.status = "assigned";
    } else {
      order.assignedAt = null;
      order.status = "pending";
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Mark order completed
// @route PUT /api/orders/:id/complete
// @access Staff only
router.put("/:id/complete", protect, authorizeRoles("staff"), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure staff can only complete their assigned order
    if (order.assignedTo.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You are not assigned to this task" });
    }

    order.status = "completed";
    order.completedAt = new Date();

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Update status directly
// @route PUT /api/orders/:id/status
// @access Admin only
router.put("/:id/status", protect, authorizeRoles("admin"), async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    if (status === "completed" && !order.completedAt) {
      order.completedAt = new Date();
    } else if (status !== "completed") {
      order.completedAt = null;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
