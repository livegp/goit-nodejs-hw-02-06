import { Router } from "express";
import ctrl from "../../controllers/auth.js";
import validateBody from "../../middlewares/validateBody.js";
import {schemas} from "../../models/user.js";
import authenticate from "../../middlewares/authenticate.js";

const userRegisterValidate = validateBody(schemas.registerSchema);
const userLoginValidate = validateBody(schemas.loginSchema);
const userUpdateSubscriptionValidate = validateBody(schemas.updateSubscriptionSchema);

const router = Router();

router.post("/register", userRegisterValidate, ctrl.register);

router.post("/login", userLoginValidate, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, userUpdateSubscriptionValidate, ctrl.updateSubscription);

export default router;