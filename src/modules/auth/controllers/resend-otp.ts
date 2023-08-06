import { Request, Response } from 'express';
import requestValidator from '@helpers/request-validator.helper';
import { ResendOTPDTO } from '../dto';
import Email from '@helpers/email.helper';
import { GenerateOTP } from '@core/utils';
import moment from 'moment';

export default async function ResendOTP(req: Request, res: Response){
    const error = requestValidator(ResendOTPDTO, req.body)
    if(error){
        return res.unprocessableEntity({ error })
    }
    const { email } = req.body;
    const user = await App.Models.User.findOne({ email })

    if(!user){
        return res.notFound({ error: App.Message.Error.UserNotFound() })
    }
    const otp = GenerateOTP(6)
    user.otp = otp;
    user.otpExpiresIn = moment().add(App.Config.VERIFY_OTP_EXPIRES_IN, 'minute')
    await user.save();
    // new Email(email).verifyEmailOTP({ name: user.name, otp})
    return res.success({ message: App.Message.Success.EmailOTPSent()})
}