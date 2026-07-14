import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.registerUser)

router.get("/me",
    auth(Role.ADMIN, Role.USER),
    userController.getProfile)

router.put("/my-profile", auth(Role.USER, Role.ADMIN), userController.updateMyProfile)

export const userRoutes = router;