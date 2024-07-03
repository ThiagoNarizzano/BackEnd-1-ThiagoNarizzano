import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const router = Router();

router.post("/carts", async (req, res) => {

    try{
        const cart = await cartManager.createCart();
        res.status(201).json({ status: "ok", cart });
    }catch(error){
        console.log(error)
        res.status(500).json({ status: "error", msg:"Internal server error" });
    }
});


router.get("/carts/:cid", async (req, res) =>{

    try{
        const { cid } = req.params;

        const cart = await cartManager.getCartById(cid);
        if(!cart) return res.status(404).json({ status: "error", msg: "Cart not found" });

        res.status(201).json({ status: "ok", cart })
    }catch(error){
        res.status(500).json({ status: "error", msg:"Internal server error" });
    }
});


router.post("/carts/:cid/product/:pid", async(req, res) =>{

    try{
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(cid, pid);
        if(!cart) return res.status(404).json({ status: "error", msg: "Cart not found" });

        res.status(201).json({ status: "ok", cart })
    }catch(error){
        res.status(500).json({ status: "error", msg:"Internal server error" });
    }
});

export default router