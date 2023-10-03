import { Router } from "express";
import ctrl from "../../controllers/auth.js";
import validateBody from "../../middlewares/validateBody.js";
import {schemas} from "../../models/user.js";

const router = Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

export default router;