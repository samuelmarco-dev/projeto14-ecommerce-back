import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from './routes/authRouter.js';
import productRouter from "./routes/productRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";
import cartRouter from "./routes/cartRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(cartRouter);
app.use(authRouter);
app.use(productRouter);
app.use(checkoutRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log((`Server is running on port ${port}`));
});