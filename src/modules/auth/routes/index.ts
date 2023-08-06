import { Router } from 'express'
import Controller from '../controllers'
import { Wrap } from '@core/utils'

const router = Router()

router.post('/login', Wrap(Controller.Login))
router.post('/register', Wrap(Controller.Register))
router.post('/verify-otp', Wrap(Controller.VerifyOTP))
router.post('/resend-otp', Wrap(Controller.ResendOTP))
router.post('/forgot-password', Wrap(Controller.ForgotPassword))
router.patch('/reset-password', Wrap(Controller.ResetPassword))


export default router