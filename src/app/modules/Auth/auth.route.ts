import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router()

route.post("/register",authController.createUser)
// route.post("/login",userController.createUser)

export const authRoute = route;
