
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/db");
const productoRoutes = require("./routes/producto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/", productoRoutes);

dbconnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error("Error al conectar a la base de datos:", error);
  process.exit(1);
});
