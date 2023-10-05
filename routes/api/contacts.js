import { Router } from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import {schemas} from "../../models/contact.js";
import isValidId from "../../middlewares/isValidId.js";

const contactAddValidate = validateBody(schemas.addSchema)
const contactUpdateFavoriteValidate = validateBody(schemas.updateFavoriteSchema)

const router = Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", contactAddValidate, ctrl.addContact);

router.delete("/:id",isValidId, ctrl.removeContact);

router.put("/:id",isValidId, contactAddValidate, ctrl.updateContact);

router.patch("/:id/favorite",isValidId, contactUpdateFavoriteValidate, ctrl.updateFavoriteContact);

export default router;