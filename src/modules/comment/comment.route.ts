import { Router } from "express";
import { commentController } from "./comment.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.get("/author/:authorId", commentController.getCommentsByAuthorId)

router.get("/:commentId", commentController.getCommentByCommentId)

router.post("/", auth(Role.USER, Role.ADMIN), commentController.createComment)

router.patch("/:commentId", auth(Role.USER, Role.ADMIN), commentController.updateComment)

router.delete("/:commentId", auth(Role.USER, Role.ADMIN), commentController.deleteComment)

router.delete("/:commentId/moderate", auth(Role.ADMIN), commentController.createComment)

export const commentRoutes = router