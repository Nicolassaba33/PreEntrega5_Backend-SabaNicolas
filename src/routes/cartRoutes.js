const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

router.get("/:cid", async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
});

// POST /api/carts
router.post("/", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

module.exports = router;
