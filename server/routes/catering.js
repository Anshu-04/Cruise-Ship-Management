import express from "express";
import CateringItem from "../models/CateringItem.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Get all catering items
// @route GET /api/catering
router.get("/", async (req, res) => {
  try {
    const items = await CateringItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Create catering item
// @route POST /api/catering
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newItem = new CateringItem({ name, description, price, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Update catering item
// @route PUT /api/catering/:id
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const item = await CateringItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Catering item not found" });
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

// @desc Delete catering item
// @route DELETE /api/catering/:id
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const item = await CateringItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Catering item not found" });
    }

    await CateringItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Catering item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
