import { Router } from "express";

import authCookies from "../../middleware/authCookies";
import { Role } from "../../../../prisma/generated/prisma/enums";
import { ParticipantController } from "./participant.controller";


const router = Router();

router.post(
  "/joint-event/:id",
  authCookies(Role.USER, Role.HOST),
  ParticipantController.joinEvent
);

router.post(
  "/review",
  authCookies(Role.USER),
  ParticipantController.joinEvent
);

export const ParticipantRoutes = router;
