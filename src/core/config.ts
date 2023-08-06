import '@core/declarations';
import { FileExistsSync } from './utils';

export interface ConfigInterface {
    PORT: number
    ENVIRONMENT: string;
    DB_CONNECTION_STRING: string
    SALT_ROUND: number
    JWT_SECRET: string
    JWT_EXPIRY: string
    BACKEND_HOST_URL: string
    VERIFY_OTP_EXPIRES_IN: number
    ITEMS_PER_PAGE: number
    AWS:{
        ACCESS_KEY: string;
        SECRET_KEY: string;
        REGION: string;
        S3_BUCKET_NAME: string;
        MAIL_FROM: string
    };
    BRAND_NAME: string;
    FRONTEND_HOST_URL: string

}

export default (): ConfigInterface => {
    const { NODE_ENV } = process.env
    const environment = NODE_ENV?.toLowerCase()
    const environmentFileLocation = `${__dirname}/../environments`
    const environmentFilePath = `${environmentFileLocation}/${environment}`
    if (FileExistsSync(environmentFilePath)) {
        // eslint-disable-next-line
        const configuration: ConfigInterface = (require(environmentFilePath).default)()
        return configuration
} else {
        Logger.error(App.Message.Error.MissingEnvFile({ environment }))
        throw Error(App.Message.Error.MissingEnvFile({ environment }))
    }
}