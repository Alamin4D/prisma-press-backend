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
            profile: {
                create: {
                    profilePhoto,
                }
            }
        }
    })

    // await prisma.profile.create({
    //     data: {
    //         userId: CreatedUser.id,
    //         profilePhoto,
    //     }
    // })

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

const getMyProfileFromDB = async(userId: string)=>{
    const user = await prisma.user.findUniqueOrThrow({
        where : {id: userId},
        omit: {
            password: true,
        },
        include: {
            profile: true
        }
    })

    return user;
}

const updateMyProfileFromDB = async(userId: string, payload: any)=>{
    const {name, email, bio, profilePhoto} = payload;

    const updatedUser = await prisma.user.update({
        where: {id: userId},
        data: {
            name,
            email,
            profile:{
                update:{
                    profilePhoto,
                    bio
                }
            }
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return updatedUser;
}



export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfileFromDB,
}