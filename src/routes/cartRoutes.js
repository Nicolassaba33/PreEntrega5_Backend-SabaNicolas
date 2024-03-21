const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const Cart = require("./cartModel");
const mongoose = require("mongoose");

router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products");
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Supongamos que el ID del producto se pasa como parámetro en la URL
    const productId = req.params.pid;

    // Aquí podrías realizar validaciones adicionales antes de agregar el producto al carrito

    cart.products.push(productId); // Agregar el ID del producto al arreglo de productos del carrito
    await cart.save(); // Guardar el carrito actualizado en la base de datos

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = new Cart({
      // Aquí podrías inicializar el carrito con datos específicos si es necesario
    });
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

module.exports = router;
