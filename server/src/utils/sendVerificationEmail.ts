import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  toEmail: string,
  propertyId: number
) {
  const emailHtml = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <body style="font-family: Verdana, sans-serif; padding: 20px; color: #000000;">
      
    <p> It is valid till <strong>30 seconds</strong> </p>
      <a
        href="http://localhost:3001/approve/${propertyId}"
        style="display: inline-block; padding: 10px 20px; margin-top: 20px;
               background-color: #61dafb; color: white; text-decoration: none;
               border-radius: 4px; font-size: 16px;"
      >
        Approve
      </a>
      
      <a
        href="http://localhost:3001/reject/${propertyId}"
        style="display: inline-block; padding: 10px 20px; margin-top: 20px;
               background-color: #61dafb; color: white; text-decoration: none;
               border-radius: 4px; font-size: 16px;"
      >
        Reject
      </a>
    </body>
  </html>`;

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
    subject: "Your Verification Code",
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
