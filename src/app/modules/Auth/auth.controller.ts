import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"

const createUser = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
    console.log(req.body)
     const result = await authServices.createUsre(req.body)
   
        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user created successfully",
            data: result
        })
})


export const authController = {
    createUser
}