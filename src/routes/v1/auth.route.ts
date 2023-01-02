import express from "express";
import auth from "../../controllers/auth.controller";
import authValidation from "../../validations/auth.validation";
import validate from "../../middlewares/validate";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), auth.signup);
router.post("/signin", validate(authValidation.signin), auth.signin);

export default router;
