import { Request, Response } from 'express';
import requestValidator from '@helpers/request-validator.helper';
import { ResendOTPDTO } from '../dto';
import { GenerateRandomString } from '@core/utils';
import moment from 'moment';

export default async function ForgotPassword(req: Request, res: Response){
    const error = requestValidator(ResendOTPDTO, req.body)
    if(error){
        return res.unprocessableEntity({ error })
    }
    const { email } = req.body;
    const user = await App.Models.User.findOne({ email })

    if(!user){
        return res.notFound({ error: App.Message.Error.UserNotFound() })
    }
    const token = GenerateRandomString(64)
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiresIn = moment().add(App.Config.VERIFY_OTP_EXPIRES_IN, 'minute')
    await user.save();
    const link = `${App.Config.FRONTEND_HOST_URL}?token=${token}`
    return res.success({ message: App.Message.Success.ResetPasswordLink()})
}