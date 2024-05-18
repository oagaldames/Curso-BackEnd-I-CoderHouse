import { request, response } from "express";
import ProductManager from "../models/ProductManager.js";

// Instancia de Clase ProductManager con archivo JSON /data/products.json
const productManager = new ProductManager("./data/products.json");

export const chkProductData = async (req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category,
        };

        const products = await productManager.getProducts();

        // Validación de campos sean obligatorios
        const checkData = Object.values(newProduct).includes(undefined);
        if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" });

        
        // Validar existencia del campo de code
        const productExists = products.find((p) => p.code === code);
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });

        next()


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};
