import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.registerUser)

router.get("/me",
    // (req: Request, res: Response, next: NextFunction) => {
    //     console.log(req.cookies);
    //     const { accessToken } = req.cookies
    //     console.log(accessToken)

    //     const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)


    //     if (!verifiedToken.success) {
    //         throw new Error(verifiedToken.error)
    //     }

    //     const { id, name, email, role } = verifiedToken.data as JwtPayload;
    //     const requiredRoles = [Role.USER, Role.ADMIN];

    //     if (!requiredRoles.includes(role)) {
    //         return res.status(403).json({
    //             success: false,
    //             statusCode: httpStatus.FORBIDDEN,
    //             message: "Forbidden. You don't have permission to access this resource."
    //         })
    //     }

    //     req.user = {
    //         id,
    //         name,
    //         email,
    //         role
    //     }

    //     next();
    // }
    auth(Role.ADMIN, Role.USER),
    userController.getProfile)

router.put("/my-profile", auth(Role.USER, Role.ADMIN), userController.updateMyProfile)

export const userRoutes = router;