import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";




const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered successfully!",
    //     data: {
    //         user
    //     }
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully!",
        data: { user }
    })
})

const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { accessToken } = req.cookies
    console.log(accessToken)

    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    if (typeof verifiedToken === 'string') {
        throw new Error("Valid token")
    }

    const profile = await userService.getMyProfileFromDB(verifiedToken.id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile successfully",
        data: { profile }
    })
})



export const userController = {
    registerUser,
    getProfile
}