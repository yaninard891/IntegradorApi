const express= require("express");

const app= express();
const dbconnect = require("./config/db");
const productoRoutes = require("./routes/producto");



app.use(express.json());

app.use(productoRoutes);


dbconnect().then(() => {
    
    app.listen(3000, () => {
        console.log("Servidor corriendo en el puerto 3000");
    });

}).catch((error) => {
    console.log("No se pudo iniciar debido a un error en la base de datos");
    
});


