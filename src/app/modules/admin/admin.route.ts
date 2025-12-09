import { Router } from "express";
import { AdminController } from "./admin.controller";

const route = Router()

route.get("/all-events",AdminController.getAllEvents)

export const AdminRoute = route;
