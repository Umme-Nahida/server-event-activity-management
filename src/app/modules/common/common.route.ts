import { Router } from "express";
import { CommonController } from "./common.controller";

const route = Router()

route.get("/all-events",CommonController.getAllEvents)

export const CommonRoute = route;
