import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import config from "../../config"
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
        throw new Error("User with this email already exists!")
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))


    const CreatedUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    await prisma.profile.create({
        data: {
            userId: CreatedUser.id,
            profilePhoto,
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: CreatedUser.id,
            email: CreatedUser.email || email,
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return user;
}



export const userService = {
    registerUserIntoDB
}