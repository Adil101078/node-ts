export const returnTemplate = (data: { name: any; link: any }) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    
    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px;">
            <h1 style="text-align: center; color: #333333;">Password Reset</h1>
            <p style="text-align: center; text-transform: capitalize;">Dear ${data.name},</p>
            <p style="text-align: center;">We received a request to reset your password. Click the button below to reset your password:</p>
            <div style="text-align: center;">
                <a href=${data.link} style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            <p style="text-align: center;">If you did not initiate this request, please ignore this email.</p>
            <p style="text-align: center;">Best regards,<br>${App.Config.BRAND_NAME}</p>
        </div>
    </body>
    
    </html>
    `
}