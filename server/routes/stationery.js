import express from "express";
import StationeryItem from "../models/StationeryItem.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get all stationery items
// @route GET /api/stationery
router.get("/", async (req, res) => {
  try {
    const items = await StationeryItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Create stationery item
// @route POST /api/stationery
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newItem = new StationeryItem({ name, description, price, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Update stationery item
// @route PUT /api/stationery/:id
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const item = await StationeryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Stationery item not found" });
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price !== undefined ? price : item.price;
    item.image = image || item.image;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Delete stationery item
// @route DELETE /api/stationery/:id
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const item = await StationeryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Stationery item not found" });
    }

    await StationeryItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Stationery item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
