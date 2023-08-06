import constant from '@core/constants'
import joi from 'joi'

export const LoginDTO = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

export const RegisterDTO = joi.object({
    userType: joi.string().valid(...constant.USER_TYPES).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    country: joi.string().required(),
    name: joi.string().required(),
    countryCode: joi.string().required(),
    mobile: joi.string().required(),
    companyRegistrationNumber: joi.when('userType', {
        is: constant.USER_TYPES[1],
        then: joi.string().required(),
        otherwise: joi.string().optional()
    }),
    website: joi.string().allow("").optional()

})

export const VerifyOTPDTO = joi.object({
    email: joi.string().required(),
    otp: joi.number().required(),
    isEmailVerified: joi.boolean().required()
})
export const ResendOTPDTO = joi.object({
    email: joi.string().required(),
})
export const ResetPasswordDTO = {
    Body: joi.object({
        password: joi.string().required(),
        confirmPassword: joi.string().required().description('Confirm Password')
    }),
    Query: joi.object({
        token: joi.string().required()
    })
}