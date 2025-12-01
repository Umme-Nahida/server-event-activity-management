import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { AuthService } from "./auth.service"

const createUser = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
   
    
     const result = await AuthService.registerUser(req.body);
   
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