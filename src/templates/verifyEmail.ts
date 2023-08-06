export const returnTemplate = (data: { name: any; otp: any; })=>{
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
    </head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f2f2f2;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px;">
        <h1 style="text-align: center; color: #333333;">Email Verification</h1>
        <p style="text-align: center; text-transform: capitalize;">Dear ${data.name},</p>
        <p style="text-align: center;">Thank you for signing up! Please use the following One-Time Password (OTP) to verify your account:</p>
        <div style="text-align: center; font-size: 24px; background-color: #f2f2f2; padding: 10px; border-radius: 5px;">
            ${data.otp}
        </div>
        <p style="text-align: center;">This OTP is valid for ${App.Config.VERIFY_OTP_EXPIRES_IN} minutes and can only be used once. Please do not share it with anyone.</p>
        <p style="text-align: center;">If you did not initiate this request, please ignore this email.</p>
        <p style="text-align: center;">Best regards,<br>${App.Config.BRAND_NAME}</p>
    </div>
</body>

</html>
`
}