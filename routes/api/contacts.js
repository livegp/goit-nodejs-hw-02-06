import { Router } from "express";

import {schemas} from "../../models/contact.js";
import ctrl from "../../controllers/contacts.js";
import isValidId from "../../middlewares/isValidId.js";
import validateBody from "../../middlewares/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";

const contactAddValidate = validateBody(schemas.addSchema)
const contactUpdateFavoriteValidate = validateBody(schemas.updateFavoriteSchema)

const router = Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, contactAddValidate, ctrl.addContact);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.put("/:id", authenticate, isValidId, contactAddValidate, ctrl.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, contactUpdateFavoriteValidate, ctrl.updateFavoriteContact);

export default router;