import '@core/declarations'
import { Request, Response } from 'express'
import { LoginDTO } from '../dto'
import requestValidator from '@helpers/request-validator.helper'
import { GenerateOTP } from '@core/utils'
import bcrypt from 'bcrypt'
import moment from 'moment'

export default async function Login(req: Request, res: Response){
    const { email, password } = req.body
    const error = requestValidator(LoginDTO, req.body)
    if(error){
        return res.unprocessableEntity({ error })
    }
    const user = await App.Models.User.findOne({ email })
    if(!user){
        return res.badRequest({ error: App.Message.Error.InvalidCredential()})
    }
    if(!(await bcrypt.compare(password, user.password))){
        return res.badRequest({ error: App.Message.Error.InvalidCredential()})
    }

    if(user.isBlocked){
        return res.badRequest({ error: user.blockedReason })
    }
    const otp = GenerateOTP(6)
    user.otp = otp
    user.otpExpiresIn = moment().add(App.Config.VERIFY_OTP_EXPIRES_IN, 'minute')
    await user.save()

    
    return res.success({ message: App.Message.Success.EmailOTPSent(), data: {email: user.email, isEmailVerified: user.isEmailVerified }})
}