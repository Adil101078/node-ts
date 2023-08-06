import '@core/declarations'
import { Request, Response, NextFunction } from 'express'
import * as fs from 'fs'
import ejs from 'ejs'
import { I_User } from '@models/user'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

export const FileExistsSync = (FilePath) => {
    return fs.existsSync(`${FilePath}.js`) || fs.existsSync(`${FilePath}.ts`)
}

export function Wrap(controller: CallableFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await controller(req, res, next)
      } catch (error) {
        Logger.error(error)
        return res.internalServerError({ error: error?.message })
      }
    }
}


export function GenerateOTP(length: number) {
  const characters = "0123456789"
  const charactersLength = characters.length
  const result = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * charactersLength))).join("")
  return result
}
export function GenerateCallableMessages(_Messages: any) {
  const Messages = {};

  (function _GenerateCallableMessages(target, values: any) {
    try {
      for (const key in values) {
        if (typeof values[key] === "string") {
          target[key] = (params: any) => {
            return ejs.render(values[key], params)
          }
        } else {
          target[key] = {}
          _GenerateCallableMessages(target[key], values[key])
        }
      }
    } catch (error) {
      Logger.error(error)
    }
  })(Messages, _Messages)

  return Messages
}
export function GenerateAuthToken(payload: I_User): string {
  const token = jwt.sign(
    payload,
    App.Config.JWT_SECRET,
    { expiresIn: App.Config.JWT_EXPIRY }
    )

  return token
}
export function GenerateRandomString(length: number): string {
  const byteLength = Math.ceil(length / 2) // Each byte represents two characters in hexadecimal form.
  const randomBytes = crypto.randomBytes(byteLength)
  return randomBytes.toString('hex').slice(0, length)
}