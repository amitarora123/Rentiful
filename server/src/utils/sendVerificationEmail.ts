import { Property } from "@prisma/client";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  toEmail: string,
  property: Property
) {
  const emailHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f7;
          margin: 0;
          padding: 0;
          color: #333333;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
          padding: 30px;
        }
        h1 {
          color: #333333;
          font-size: 24px;
          margin-bottom: 10px;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 25px;
        }
        .property-info {
          background-color: #f9fafb;
          border-left: 4px solid #61dafb;
          padding: 15px 20px;
          margin-bottom: 30px;
          border-radius: 6px;
        }
        .property-info strong {
          color: #61dafb;
        }
        .button {
          display: inline-block;
          text-decoration: none;
          padding: 12px 25px;
          margin: 5px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 16px;
        }
        .approve {
          background-color: #28a745;
          color: #ffffff;
        }
        .reject {
          background-color: #dc3545;
          color: #ffffff;
        }
        .footer {
          font-size: 12px;
          color: #888888;
          margin-top: 30px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Property Verification Needed</h1>
        <p>Hello,</p>
        <p>Please review the property details below and take action. This verification link is valid for <strong>5 minutes</strong>.</p>
        
        <div class="property-info">
          <p><strong>Property Name:</strong> ${property.name}</p>
          <p><strong>Description:</strong> ${property.description}</p>
          <p><strong>Price per Month:</strong> $${property.pricePerMonth}</p>
          <p><strong>Location ID:</strong> ${property.locationId}</p>
        </div>

        <a href="http://localhost:3001/approve/${property.id}" class="button approve">Approve</a>
        <a href="http://localhost:3001/reject/${property.id}" class="button reject">Reject</a>

        <div class="footer">
          This email was sent automatically. Please do not reply.
        </div>
      </div>
    </body>
  </html>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: "Property Verification Required",
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: info.response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error };
  }
}
