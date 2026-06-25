import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { TLoginUser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";


const loginUserIntoDB = async (payload: TLoginUser) => {
    const { email, password } = payload;

    // const user = await prisma.user.findUnique({
    //     where: {email}
    // })

    // if(!user){
    //     throw new Error("User not found")
    // }

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    if (user.activeStatus === "SUSPENDED") {
        throw new Error("Your account has been suspended. Please contract support")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Password does not match");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret,
    //     {
    //         expiresIn: config.jwt_access_expires_in
    //     } as SignOptions
    // )

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    // const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret,
    //     {
    //         expiresIn: config.jwt_refresh_expires_in
    //     } as SignOptions
    // )

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )

    return {
        accessToken,
        refreshToken,
    };
}

export const authServices = {
    loginUserIntoDB
}