import '@core/declarations'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(!req.headers.authorization){
      return res.unauthorized({ error: App.Message.Error.SessionExpired() })
    }

    const token = req.headers.authorization.split(' ')[1]

    const decoded : any = jwt.verify(token, App.Config.JWT_SECRET)

    const user = await App.Models.User.findById({ _id: decoded.user._id })

    if(!user){
      return res.unauthorized()
    }
    delete user?.password
    req.user = user
    return next()
  } catch (error) {
    Logger.error(error)  
    return res.unauthorized({ error })
  }
}
export default authorize