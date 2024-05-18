import { Router } from "express";
import CartManager from "../models/CartManager.js";
import ProductManager from "../models/ProductManager.js";


const router = Router();

// Instancia de Clase CartManager con archivo JSON /data/carts.json
const cartManager = new CartManager("./data/carts.json");
const productManager = new ProductManager("./data/products.json");

// Ruta para agregar un nuevo carrrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.addCart();

        if (newCart) {
            res.status(201).send({ status: "success", Result: newCart });
        } else {
            res.status(400).send({ status: "error", msg: "Carrito no agregado" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para obtener un carrito por ID
router.get("/:cid", async (req, res) => {
    try {
        const idcart = parseInt(req.params.cid);
        const cartById = await cartManager.getCartById(idcart);
        if (cartById.success) {
            res.status(200).send({ status: "success", Result: cartById });
        } else {
            res.status(404).send({ status: "Error", msg: "Carrito no encontrado" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para agregar un nuevo producto al carrito seleccionado si no existe
//si el producto existe suma 1 a la cantidad existente
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);
        const quantity = 1;
        const product= await productManager.getProductById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        const cart = await cartManager.addProductsToCart(cid, pid, quantity);
        
        if (cart) {
            res.status(200).send({ status: "success", Result: cart });
        } else {
            res.status(400).send({ status: "error", message: "Error al agregar producto al carrito" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error interno del servidor", error: error.message });
    }
});

export default router;

