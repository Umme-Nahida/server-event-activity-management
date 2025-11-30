import http, { Server } from "http"
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma";

dotenv.config();

let server: Server | null = null;


async function connectToDB() {
    try{
        await prisma.$connect();
        console.log("DB connected")
    }catch(err:any){
        console.log("DB connection Err:", err)
    }
}

async function startServer() {
    try {
        await connectToDB()
        server = http.createServer(app);
        server.listen(process.env.port, () => {
            console.log(`Example app listening on port ${process.env.port}`)
        })
    } catch (err: any) {
        console.log("server Err:", err)
    }
}

startServer()