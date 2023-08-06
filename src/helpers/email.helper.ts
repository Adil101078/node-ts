import '@core/declarations'
import nodemailer from "nodemailer"

export default async function SendEmail({
  to,
  template,
  subject,
  attachments = [],
}) {
  try {
    const transport = nodemailer.createTransport({
      host: App.Config.NODE_MAILER.HOST,
      port: App.Config.NODE_MAILER.PORT,
      secure: true,
      auth: {
        user: App.Config.NODE_MAILER.EMAIL,
        pass: App.Config.NODE_MAILER.PASS,
      },
    })

    const mailOptions = {
      from: App.Config.NODE_MAILER.SENDER,
      to,
      subject,
      html: template,
      attachments,
    }

    const info = await transport.sendMail(mailOptions)

    Logger.info(`Email sent successfully to ${to}!`)
    return info
  } catch (err) {
    Logger.error(JSON.stringify(err?.message))
    throw err
  }
}
