import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/Auth/auth.route";


export const router = Router();

const moduleRoutes = [
    {
        path:"/auth",
        route: authRoute
    },
    {
        path:"/user",
        route: userRoute
    },

]


moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

// router.use("/user", userRoute)
// router.use("/tour", tourRoute)
// router.use("/division", divisionRoute)
// router.use("/booking", bookingRoute)