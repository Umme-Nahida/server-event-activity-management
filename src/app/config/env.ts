import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
    port: string,
    DATABASE_URL: string,
    node_env: string,
    JWT_SECRET: string,
    JWT_EXPIRES_IN: string,
    JWT_REFRESH_SECRET: string,
    JWT_EXPIRES_IN_REFRESH: string,
    RESET_PASS_TOKEN: string,
    RESET_PASS_TOKEN_EXPIRES_IN: string,
    SALT_ROUND: string,

}

const loadEnvVars = (): IEnvVars => {
    const requiredEnvVars: string[] = ["port", "DATABASE_URL", "node_env", "JWT_SECRET", "JWT_EXPIRES_IN",  "JWT_REFRESH_SECRET", "JWT_EXPIRES_IN_REFRESH", "RESET_PASS_TOKEN", "RESET_PASS_TOKEN_EXPIRES_IN", "SALT_ROUND" ]

    requiredEnvVars.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        port: process.env.port as string,
        DATABASE_URL: process.env.DATABASE_URL!,
        node_env: process.env.node_env as string,
        JWT_SECRET: process.env.JWT_SECRET as string,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,   
        JWT_EXPIRES_IN_REFRESH: process.env.JWT_EXPIRES_IN_REFRESH as string,
        RESET_PASS_TOKEN: process.env.RESET_PASS_TOKEN as string,
        RESET_PASS_TOKEN_EXPIRES_IN: process.env.RESET_PASS_TOKEN_EXPIRES_IN as string,
        SALT_ROUND: process.env.SALT_ROUND as string,
       
    }
}
export const envVars = loadEnvVars()