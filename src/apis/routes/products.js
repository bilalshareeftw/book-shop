const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Products were fetched"
    });
});

router.post("/", (req, res) => {
    const product = {
        productId: 1,
        name: req.body.name
    };
    res.status(201).json({
        message: "Product was created",
        createdProduct: product
    });
});

router.get("/:productId", (req, res) => {
    res.status(200).json({
        message: "Product details",
        productId: req.params.productId
    });
});

router.delete("/:productId", (req, res) => {
    res.status(200).json({
        message: "Product deleted",
        productId: req.params.productId
    });
});

module.exports = router;
