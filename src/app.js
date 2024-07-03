import express from "express"
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));


app.use("/api", productRouter);
app.use("/api", cartRouter);



app.listen (PORT, () => {

    console.log(`servidor escuchando en el puerto ${PORT}`)

})

