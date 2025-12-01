import { Router } from "express";
import { userController } from "./user.controller";

const route = Router()

route.post("/",userController.createUser)

export const userRoute = route;

