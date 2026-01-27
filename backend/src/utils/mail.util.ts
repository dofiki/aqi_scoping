import nodemailer from "nodemailer";

export const sendOtpEmail = async (toEmail: string, otp: string) => {
  try {
    // Validate environment variables
    if (!process.env.G_EMAIL_ADDRESS || !process.env.G_EMAIL_APP_PASSWORD) {
      throw new Error(
        "Email credentials not configured in environment variables",
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.G_EMAIL_ADDRESS,
        pass: process.env.G_EMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("Server is ready to send emails");

    // Email content
    const mailOptions = {
      from: `"AQI Scoping" <${process.env.G_EMAIL_ADDRESS}>`,
      to: toEmail,
      subject: "Your Verification Code",
      text: `Your verification code for AQI Scoping is: ${otp}. This code will expire in 10 minutes.`,
      html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: #8bae66; padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">AQI Scoping</h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: black; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Verification Code</h2>
            
            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              Use the following code to complete your verification:
            </p>
            
            <div style="background-color: #f8f9fa; border: 2px dashed #8bae66; border-radius: 8px; padding: 24px; text-align: center; margin: 0 0 30px 0;">
              <div style="font-size: 36px; font-weight: 700; color: #8bae66; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
              This code will expire in <strong style="color: #666666;">10 minutes</strong>.
            </p>
            
            <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 0;">
              If you didn't request this code, please ignore this email.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
              © ${new Date().getFullYear()} AQI Scoping. Monitoring air quality for a healthier tomorrow.
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully: %s", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw new Error(
      `Failed to send email: ${err instanceof Error ? err.message : "Unknown error"}`,
    );
  }
};
