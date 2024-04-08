import { Router } from "express";
import { authorizeHandler, loginHandler, logoutHandler, signupHandler } from "../controllers/userController";

const router = Router();

router.post("/signup",signupHandler);
router.post("/login",loginHandler);
router.get("/logout",logoutHandler);
router.get("/checkAuth",authorizeHandler);

export default router