import { ConfigInterface } from '@config'
import dotenv from 'dotenv'
dotenv.config()

export default (): ConfigInterface => {
    return {
        PORT: +process.env.PORT,
        ENVIRONMENT: process.env.NODE_ENV,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        BACKEND_HOST_URL: process.env.BACKEND_HOST_URL,
        VERIFY_OTP_EXPIRES_IN: +process.env.OTP_EXPIRES_IN,
        SALT_ROUND: +process.env.SALT_ROUND,
        ITEMS_PER_PAGE: +process.env.ITEMS_PER_PAGE,
        AWS:{
            ACCESS_KEY: process.env.AWS_ACCESS_KEY,
            SECRET_KEY: process.env.AWS_SECRET_KEY,
            REGION: process.env.AWS_REGION,
            S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
            MAIL_FROM: process.env.AWS_MAIL_FROM
        },
        BRAND_NAME: process.env.BRAND_NAME,
        FRONTEND_HOST_URL: process.env.FRONTEND_HOST_URL
    }
}