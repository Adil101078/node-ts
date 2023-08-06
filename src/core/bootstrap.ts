import '@core/declarations'
import { Application } from "app"

export default async (app: Application) => {  // eslint-disable-line
    try {
        // Do stuff that needs to be done before server start

    } catch (error) {
        Logger.error(error)
    }
}
