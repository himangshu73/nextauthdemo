export const verificationEmail = (name: string, otp: string, expiry: Date) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #2563eb;">Email Verification</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering with us. Please verify your email address using the following code:</p>
    
    <div style="background: #f8f9fa; padding: 15px; margin: 20px 0; text-align: center;">
      <h3 style="margin: 0; letter-spacing: 3px;">${otp}</h3>
    </div>
    
    <p>This code will expire at <strong>${expiry.toLocaleTimeString()} on ${expiry.toLocaleDateString()}</strong>.</p>
    
    <p>If you didn't request this, please ignore this email.</p>
    
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 12px; color: #777;">
      For security reasons, please do not share this code with anyone.
    </p>
  </div>
`;
