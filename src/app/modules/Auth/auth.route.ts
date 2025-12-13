import { Router } from "express";
import { AuthController } from "./auth.controller";
import { fileUploader } from "../../helper/fileUploader";
import { validationSchema } from "../../middleware/validationMiddleware";
import { userCreateSchema } from "./auth.validation";
import authCookies from "../../middleware/authCookies";
import { Role } from "../../../../prisma/generated/prisma/enums";

const route = Router()

route.post("/register",
    fileUploader.upload.single('file'),
    validationSchema(userCreateSchema),
    AuthController.createUser
)

route.post("/login",AuthController.login)

route.post(
    '/change-password',
    authCookies(
       Role.SUPER_ADMIN,
       Role.ADMIN,
       Role.HOST,
       Role.USER
    ),
    AuthController.changePassword
);

export const authRoute = route;
