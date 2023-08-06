import { Request, Response } from 'express'
import requestValidator from '@helpers/request-validator.helper'
import { ResetPasswordDTO } from '../dto'
import bcrypt from 'bcrypt'

export default async function ResetPassword(req: Request, res: Response){
    const error = requestValidator(ResetPasswordDTO.Body, req.body)
    const _error = requestValidator(ResetPasswordDTO.Query, req.query)
    if(error){
        return res.unprocessableEntity({ error })
    }
    if(_error){
        return res.unprocessableEntity({ error:_error })
    }
    const { password, confirmPassword } = req.body
    const  { token } = req.query
    const user = await App.Models.User.findOne({resetPasswordToken: token})

    if(!user || user.resetPasswordTokenExpiresIn.getTime() <  new Date().getTime()){
        return res.badRequest({ error: App.Message.Error.LinkExpired()})
    }    
    if(password !== confirmPassword){
        return res.badRequest({error: App.Message.Error.PassNotMatch()})
    }
    const hashPass = await bcrypt.hash(password, App.Config.SALT_ROUND)
    user.password = hashPass
    user.resetPasswordToken = null
    await user.save()
    return res.success({ message: App.Message.Success.PasswordReset()})
}