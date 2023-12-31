import '@core/declarations'
import { Router } from 'express'
import authRouter from '@modules/auth/routes'

const router = Router()

router.use('/auth', authRouter)

export const AppRoutes = router
