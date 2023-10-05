import { Router } from "express";
import ctrl from "../../controllers/auth.js";
import validateBody from "../../middlewares/validateBody.js";
import {schemas} from "../../models/user.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logout);

export default router;