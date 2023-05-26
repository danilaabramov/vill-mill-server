import Product from "../models/Product.js"
import express from "express";
const router = express.Router()

//CREATE Products
router.post("/", async (req, res) => {
    const newPost = new Product(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE Products
router.put("/:id", async (req, res) => {
    try {
        try {
            const updatedPost = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE Products
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        try {
            await product.delete();
            res.status(200).json("Post has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Products
router.get("/", async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router