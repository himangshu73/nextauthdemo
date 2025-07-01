export const verificationEmail = (name: string, otp: string, expiry: Date) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { color: #2563eb; }
      .otp-box { 
        background: #f8f9fa; 
        padding: 15px; 
        margin: 20px 0; 
        text-align: center;
        border-radius: 4px;
      }
      .footer { 
        font-size: 12px; 
        color: #777; 
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2 class="header">Email Verification</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering with us. Please verify your email address using the following code:</p>
      
      <div class="otp-box">
        <h3 style="margin: 0; letter-spacing: 3px;">${otp}</h3>
      </div>
      
      <p>This code will expire at <strong>${expiry.toLocaleTimeString()} on ${expiry.toLocaleDateString()}</strong>.</p>
      
      <p>If you didn't request this, please ignore this email.</p>
      
      <div class="footer">
        <p>For security reasons, please do not share this code with anyone.</p>
      </div>
    </div>
  </body>
  </html>
`;
