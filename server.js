
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/db");

const productoRoutes = require("./routes/producto");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use(cors());
app.use(express.json());


app.use("/api", productoRoutes);

dbconnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
