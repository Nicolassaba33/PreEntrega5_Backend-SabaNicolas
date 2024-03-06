const express = require("express");
const http = require("http");
const fs = require("fs").promises;
const socketIO = require("socket.io");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const ProductManager = require("./ProductManager");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 8080;

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  require("express-handlebars")({
    defaultLayout: "main",
  })
);

const productManager = new ProductManager("./products.json");

app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/carts", cartRoutes);

app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

app.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newProduct", async () => {
    const products = await productManager.getProducts();
    io.emit("productAdded", products);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
