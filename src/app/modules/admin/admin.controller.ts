import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllEvents = catchAsync(async(req:Request,res:Response, next:NextFunction)=>{
     
    const filter = req.query;
     const result = await AdminService.getAllEvents(filter);
   
        sendResponse(res,{
            success: true,
            statusCode: httpStatus.CREATED,
            message: "user created successfully",
            data: result
        })
})

export const AdminController = {
  getAllEvents
}