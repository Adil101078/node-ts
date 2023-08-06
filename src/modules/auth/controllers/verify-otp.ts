import requestValidator from '@helpers/request-validator.helper'
import { Request, Response } from 'express'
import { VerifyOTPDTO } from '../dto'
import { GenerateAuthToken } from '@core/utils'

export default async function VerifyOTP(req: Request, res: Response){
    const error = requestValidator(VerifyOTPDTO, req.body)
    if(error){
        return res.unprocessableEntity({ error })
    }
    const { otp, email, isEmailVerified } = req.body
    const user = await App.Models.User.findOne({ email, otp })

    if(!user){
        return res.badRequest({ error: App.Message.Error.WrongOTP() })
    }

    if(user?.otpExpiresIn.getTime() < new Date().getTime()){
        return res.badRequest({ error: App.Message.Error.ExpiredOTP()})
    }
    user.isEmailVerified = true
    // user.otp = null
    await user.save()
    const payload = user.toObject()
    delete payload.password
    const authToken = GenerateAuthToken(payload)
    const message =  !isEmailVerified ? App.Message.Success.OTPVerified(): App.Message.Success.Login()
        
    return res.success({
        message,
        data: authToken
    })
}