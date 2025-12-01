import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { userServices } from "./user.service"

const createUser = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
    console.log(req.body)
     const result = await userServices.createUsre(req.body)
        
        // res.status(httpStatus.CREATED).json({
        //     message: "user created successfully",
        //     result
        // })

        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user created successfully",
            data: result
        })
})


export const userController = {
    createUser
}