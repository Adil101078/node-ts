import '@core/declarations'
import requestValidator from '@helpers/request-validator.helper'
import { Request, Response } from 'express'
import { RegisterDTO } from '../dto'
import { GenerateOTP } from '@core/utils'
import Email from '@helpers/email.helper'
import moment from 'moment'

export default async function Register(req: Request, res: Response) {
    const error = requestValidator(RegisterDTO, req.body)
    if (error) {
        return res.unprocessableEntity({ error })
    }
    const { email, name } = req.body

    const isUserExists = await App.Models.User.findOne({ email })

    if (isUserExists) {
        if (isUserExists.isEmailVerified) {
            return res.badRequest({ error: App.Message.Error.AccountAlreadyExists() })
        }
        else {
            const otp = GenerateOTP(6)
            const otpExpiresIn = moment().add(App.Config.VERIFY_OTP_EXPIRES_IN, 'minute')
            isUserExists.otp = otp
            isUserExists.otpExpiresIn = otpExpiresIn
            await isUserExists.save()
            // new Email(email).verifyEmailOTP({ name, otp })
            return res.success({ message: App.Message.Success.EmailOTPSent(), data: isUserExists.email })
        }
    } else {
        const otp = GenerateOTP(6)
        const otpExpiresIn = moment().add(App.Config.VERIFY_OTP_EXPIRES_IN, 'minute')
        const newUser = await App.Models.User.create({...req.body })
        newUser.otp = otp
        newUser.otpExpiresIn = otpExpiresIn
        await newUser.save()
        // new Email(email).verifyEmailOTP({ name, otp })
        return res.success({ message: App.Message.Success.EmailOTPSent(), data: newUser.email })
    }


}