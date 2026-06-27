import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface";


const createPostInDB = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data : {
            ...payload,
            authorId: userId
        }
    })
    return result;
}

const getAllPostsFromDB = async () => {}

const getPostStatsFromDB = async () => {}

const getPostByIdFromDB = async () => {}

const updatePostInDB = async () => {}

const deletePostFromDB = async () => {}

export const postService = {
  createPostInDB,
  getAllPostsFromDB,
  getPostStatsFromDB,
  getPostByIdFromDB,
  updatePostInDB,
  deletePostFromDB,
};