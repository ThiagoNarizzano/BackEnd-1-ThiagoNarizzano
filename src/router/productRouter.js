import { Router } from "express";
import productManager from "../managers/productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";

const router = Router();

router.get("/products", async (req, res) =>{

    try{
        const products = await productManager.getProducts();
        if (!products) return res.status(404).json({ status: "error", msg:"Products not found" });
        res.status(200).json({ status: "ok", products });
    } catch(error){
        console.log(error);
        res.status(500).json({ status: "error", msg:"internal server error" });
    }
});

router.get("/products/:pid", async (req, res) =>{
    
    try{
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        if (!product) return res.status(404).json({ status: "error", msg:"Product not found" });
        res.status(200).json({ status: "ok", product });
    } catch(error){
        console.log(error);
        res.status(500).json({ status: "error", msg:"internal server error" });
    }
});

router.put("/products/:pid", async (req, res) => {
    
    try{
        const { pid } = req.params;
        const body = req.body;
        const product = await productManager.updateProduct(pid, body);
        if (!product) return res.status(404).json({ status: "error", msg:"Product not found" });
        res.status(201).json({ status: "ok", product });
    } catch(error){
        console.log(error);
        res.status(500).json({ status: "error", msg:"internal server error" });
    }
});

router.post("/products", checkProductData, async (req, res) => {

    try{
        const body = req.body
        const product = await productManager.addProduct(body);

        res.status(201).json({ status: "ok", product})
    } catch(error){
        console.log(error);
        res.status(500).json({ status: "error", msg:"internal server error" });
    }
})

router.delete("/products/:pid", async (req, res) => {
   
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid);
  
      if (!product) return res.status(404).json({ status: "error", msg: "Product not found" });
  
      await productManager.deleteProduct(pid);
  
      res.status(200).json({ status: "ok", msg: `Product with iD ${pid} deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  });
  
  export default router;