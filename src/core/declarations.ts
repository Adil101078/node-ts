/*eslint-disable */

declare let App: {
    Config: any,
    Message:{
        Success: any,
        Error: any,
        GeneralMessage: any
    },
    Models: {
        User: any
        Transaction: any
        Notification: any
        Cms: any
    },
}
declare let Logger: {
    info: CallableFunction
    warn: CallableFunction
    error: CallableFunction
}

/*eslint-enable */