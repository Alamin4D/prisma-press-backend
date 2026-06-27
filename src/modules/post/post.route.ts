import { Router } from "express";
import { postController } from "./post.contoller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
router.post("/", auth(Role.USER, Role.ADMIN), postController.createPost)

router.get("/", postController.getAllPosts)

router.get("/stats", auth(Role.ADMIN), postController.getPostsStats)

router.get("/my-posts", auth(Role.USER, Role.ADMIN), postController.getMyPosts)

router.get("/:id", postController.getPostById)

router.patch("/:postId", auth(Role.USER, Role.ADMIN), postController.updatePost)

router.delete("/:postId", auth(Role.USER, Role.ADMIN), postController.deletePost)

export const postRoutes = router