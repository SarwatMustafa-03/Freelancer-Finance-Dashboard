const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Extract verification link from message if it exists
  const linkMatch = options.message.match(/href="([^"]+)"/);
  if (linkMatch) {
    console.log("\n✉️  EMAIL VERIFICATION LINK:");
    console.log("========================================");
    console.log(linkMatch[1]);
    console.log("========================================\n");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
