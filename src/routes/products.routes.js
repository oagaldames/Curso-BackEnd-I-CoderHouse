import { Router } from "express";
import { chkProductData } from "../middlewares/chkProductData.middleware.js";
import ProductManager from "../models/ProductManager.js";

const router = Router();

// Instancia de Clase ProductManager con archivo JSON /data/products.json
const productManager = new ProductManager("./data/products.json");

// Ruta para obtener todos los productos con límite opcional
router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (limit) {
            const limitedProducts = products.slice(0, Number(limit));
            res.status(200).send({ status: "success", limitedProducts });
        } else {
            res.status(200).send({ status: "success", products });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para obtener un producto por ID
router.get("/:pid", async (req, res) => {
    try {
        const idProduct = Number(req.params.pid);
        const productById = await productManager.getProductById(idProduct);
        if (productById) {
            res.status(200).send({ status: "success", productById });
        } else {
            res
                .status(404)
                .send({ status: "Error", error: "Producto no encontrado" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para agregar un nuevo producto
router.post("/", chkProductData, async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.addProduct(productData);
        res.status(201).send({
            message: "Producto creado correctamente",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
});

// Ruta para actualizar un producto por ID
router.put("/:pid", async (req, res) => {
    try {
        const idProduct  = Number(req.params.pid);
        const productData = req.body;
        const updatedProduct = await productManager.updateProduct(
            idProduct,
            productData
        );
        
        if (updatedProduct) {
            console.log(updatedProduct);
            res.status(200).send({
                status: "success",
                message: `El producto con Id= ${idProduct}  se ha Modificado correctamente.`,
            });
        } else {
            res.status(400).send({
                status: "error",
                error: `No se encontro un Producto con el Id ${idProduct}`
            });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
    const  idProduct  = Number(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(idProduct);
    try {
        if (deletedProduct === true) {
            res.status(200).send({
                status: "success",
                message: `El producto con Id= ${idProduct}  se ha Eliminado correctamente.`,
            });
        } else {
            res.status(409).send({
                status: "error",
                error: `No se encontro un Producto con el Id ${idProduct}`
            });
        }
    } catch (error) { }
});

export default router;
