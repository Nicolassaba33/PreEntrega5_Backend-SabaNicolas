const express = require("express");
const router = express.Router();
const productManager = require("./ProductManager");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ err: "Error al obtener productos" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ err: "Producto no encontrado" });
    } else {
      res.json({ product });
    }
  } catch (err) {
    res.status(500).json({ err: "Error al obtener el producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = {
      id: productManager.getNextProductId(),
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };
    await productManager.addProduct(newProduct);
    res.status(201).json({
      message: "Producto agregado correctamente",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
