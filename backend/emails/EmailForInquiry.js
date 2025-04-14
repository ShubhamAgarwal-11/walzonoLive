const emailTemplateForInquiry = (name, email, subject, message) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Received</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f6f6f6;
            color: #333333;
        }

        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 20px 0;
        }

        .logo {
            max-width: 200px;
            height: auto;
        }

        .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 5px;
        }

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
            <img src="https://res.cloudinary.com/daf7blofc/image/upload/v1742589542/kl2suqvae1x3kp9pqi2x.png" class="logo" alt="WALZONO Logo">
        </div>
        
        <div class="content">
            <h2>We Have Received Your Inquiry</h2>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
            
            <h3>Inquiry Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br> ${message}</p>

            <p>If your inquiry is urgent, please contact our support team directly.</p>

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

module.exports = emailTemplateForInquiry;