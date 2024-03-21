const mongoose = require("mongoose");

mongoose
  .connect("tu_URL_de_conexión_a_Atlas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB Atlas establecida"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));

module.exports = mongoose;
