
const emailTemplateForOTP = (otp,name) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification Email</title>
    <style>
        /* Reset styles */
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f6f6f6;
            color: #333333;
        }
        
        /* Main container */
        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* Header styles */
        .header {
            text-align: center;
            padding: 20px 0;
        }
        
        .logo {
            max-width: 200px;
            height: auto;
        }
        
        /* Content styles */
        .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
        }
        
        .otp-box {
            background-color: #f8f9fa;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 24px;
            font-weight: bold;
            color: #2d3748;
        }
        
        /* Footer styles */
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #718096;
        }
        
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4299e1;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="header">
            <img src="https://res.cloudinary.com/daf7blofc/image/upload/v1741717905/image_4_zhxs7e.png" class="logo" alt="WALZONO Logo">
        </div>
        
        <div class="content">
            <h2>Verify Your Login</h2>
            <p>Hello ${name},</p>
            <p>We received a login attempt to your partner dashboard. Please use the following OTP to complete your verification:</p>
            
            <div class="otp-box">
                ${otp}
            </div>
            
            <p>This OTP will be valid for <strong>15 minutes</strong>. If you didn't request this code, please ignore this email or contact our support team immediately.</p>
            
            <p>Best regards,<br>
            Walzono Team</p>
        </div>
        
        <div class="footer">
            <p>© 2025 Walzono. All rights reserved.</p>
            <p>Need help? Contact us at <a href="mailto:walzonowithus@gmail.com">[Support Email]</a></p>
            <p>Visit our website: <a href="https://walzono.com">walzono.com</a></p>
        </div>
    </div>
</body>
</html>`;

module.exports = {emailTemplateForOTP};