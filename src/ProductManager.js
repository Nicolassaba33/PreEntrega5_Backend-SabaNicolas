const Product = require("./productModel");

class ProductManager {
  constructor() {}

  async addProduct(product) {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      console.log("Producto agregado:", newProduct);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        console.error("Producto no encontrado");
        return null;
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        console.error("Producto no encontrado");
        return;
      }
      console.log("Producto eliminado:", deletedProduct);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  async updateProduct(id, productToUpdate) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        productToUpdate,
        { new: true }
      );
      if (!updatedProduct) {
        console.error("Producto no encontrado");
        return;
      }
      console.log("Producto actualizado:", updatedProduct);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }
}

module.exports = ProductManager;
