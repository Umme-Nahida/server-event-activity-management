import { Router } from "express";
import { CommonController } from "./common.controller";

const route = Router()

route.get("/all-events",CommonController.getAllEvents);
route.get("/top-rated", CommonController.getTopRatedEvents);


export const CommonRoute = route;
