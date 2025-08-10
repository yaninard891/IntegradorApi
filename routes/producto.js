const express = require("express");
const router = express.Router();

const ModelProducto = require("../models/productomodel");


router.get("/producto", async (req, res) => {
    try {
        const producto = await ModelProducto.find();
        res.status(200).send(producto);

    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener los productos", error });
    }

});

router.put("/producto/actualizar-stock", async (req, res) => {
    const data = req.body;
    try {
        const stockactualizado= await Promise.all(data.productos.map((item) => {
            return ModelProducto.findByIdAndUpdate(item.id, { cantidad: item.cantidad }, { new: true });
        }));
        res.status(200).send(stockactualizado);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el stock", error });
    }
});

router.put("/producto/:id", async (req, res) => {
    
    try {
        const productoActualizado = await ModelProducto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!productoActualizado) {
            return res.status(404).send({ mensaje: "Producto no encontrado" });
        }
        res.status(200).send(productoActualizado);
    } catch (error) {
        res.status(400).send({ mensaje: "Error al actualizar el producto", error });
    }
});

router.post("/producto", async (req, res) => {
    const body = req.body;
    try {
        const nuevoProducto = await ModelProducto.create(body);
        res.status(201).send(nuevoProducto);
    } catch (error) {
        res.status(400).send(error);
    }  
});



router.get("/producto/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await ModelProducto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send({ mensaje: "Producto no encontrado" });
        }   
        res.status(200).send(producto);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener el producto", error });
    }
});


    

router.delete("/producto/:id", async (req, res) => {
    try {
        const productoEliminado = await ModelProducto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).send({ mensaje: "Producto no encontrado" });
        }
        res.status(200).send({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el producto", error });
    }
});

router.put("/producto/:id/disponible", async (req, res) => {
    try {
        const producto = await ModelProducto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send({ mensaje: "Producto no esta diponible" });
        }

        producto.estado = "disponible";
        producto.fechaVenta = null;

        await producto.save();

        res.status(200).send({ mensaje: "Producto marcado como disponible", producto });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar estado", error });
    }
});


router.put("/producto/:id/agotado", async (req, res) => {
    try {
        const producto = await ModelProducto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send({ mensaje: "Producto no encontrado" });
        }

     producto.estado = "agotado";
     producto.fechaVenta = new Date();

    
     await producto.save();
            res.status(200).send(producto);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al marcar el producto como agotado", error });
    }
    });
    
module.exports = router;
