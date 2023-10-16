import { Router } from "express";

import {schemas} from "../../models/user.js";
import ctrl from "../../controllers/auth.js";
import upload from "../../middlewares/upload.js";
import validateBody from "../../middlewares/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";

const userRegisterValidate = validateBody(schemas.registerSchema);
const userEmailValidate = validateBody(schemas.emailSchema);
const userLoginValidate = validateBody(schemas.loginSchema);
const userUpdateSubscriptionValidate = validateBody(schemas.updateSubscriptionSchema);
const userAvatarUpload = upload.single("avatar");

const router = Router();

router.post("/register", userRegisterValidate, ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", userEmailValidate, ctrl.resendVerifyEmail);

router.post("/login", userLoginValidate, ctrl.login);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, userUpdateSubscriptionValidate, ctrl.updateSubscription);

router.patch("/avatars", authenticate, userAvatarUpload, ctrl.updateAvatar);

export default router;