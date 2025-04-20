const generateOrderNotificationEmail = ({ partnerName, customerName, orderId, orderDate, orderTotal }) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 15px;
              text-align: center;
              font-size: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              margin: 20px 0;
            }
            .content p {
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #999;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              New Order Notification
            </div>
            <div class="content">
              <p>Hi ${partnerName},</p>
              <p>A new order has been placed by <strong>${customerName}</strong>.</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Date:</strong> ${orderDate}</p>
              <p><strong>Total:</strong> $${orderTotal}</p>
              <p>Please log in to your dashboard to view the full order details.</p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  module.exports = generateOrderNotificationEmail;