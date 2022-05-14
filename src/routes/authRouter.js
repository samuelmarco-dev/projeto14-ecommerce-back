import { Router } from "express";

import { postCadastroUsuario, postLoginUsuario } from "../controllers/authController.js";
import { validateCadastro, validateLogin } from "../middlewares/authSignMiddleware.js";
import { usuarioCadastrado } from "../middlewares/userCadastradoMiddleware.js";

const authRouter = Router();

authRouter.post('/sign-up', validateCadastro, usuarioCadastrado, postCadastroUsuario);
authRouter.post('/sign-in', validateLogin, usuarioCadastrado, postLoginUsuario);

export default authRouter;