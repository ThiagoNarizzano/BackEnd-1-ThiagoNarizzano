import fs from "fs";
import { v4 as uuid } from "uuid";

let carts = [];

const path = "./src/managers/data/carts.json";

const getCarts = async () => {

    try{
        const cartsJson = await fs.promises.readFile(path, "utf-8");
        carts = JSON.parse(cartsJson) || [];

        return carts 
    }catch(error){
        console.log(`${error}`)
    }
    
};


const createCart = async () => {

    try{
        await getCarts();
        const NewCart = {
            id: uuid(),
            products: [],
        };

        carts.push(NewCart);
        await fs.promises.writeFile(path, JSON.stringify(carts));

        return NewCart    
    }catch(error){
        console.log(`${error}`)
    }
};


const getCartById = async (cid) => {

    try{
        await getCarts();
        const cart = carts.find((c) => c.id === cid);
        return cart;
    }catch(error){
        console.log(`${error}`)
    }
};


const addProductToCart = async (cid, pid) => {

    try{
        await getCarts();
        const cart = await getCartById(cid);
        const productIndex = cart.products.findIndex((p) => p.id === id);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        }else{
            const product = {
                product: pid,
                quantity: 1,
            };

            cart.products.push(product);
            await fs.promises.writeFile(path, JSON.stringify(cart));
            return cart;
        }
            
    }catch(error){
        console.log(`${error}`)
    }
}


export default {
    createCart,
    getCartById,
    addProductToCart
  };

