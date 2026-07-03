import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/checkout", auth(Role.USER, Role.ADMIN), subscriptionController.createCheckoutSession)

router.post("/webhook", subscriptionController.handleWebHook);

router.get("/status", auth(Role.USER, Role.ADMIN), subscriptionController.getSubscriptionStatus);

export const subscriptionRoutes = router;