import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON data

// Email Sending Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email Options
    const mailOptions = {
      from: "paragonsdigital@gmail.com", // Use the verified sender email
      to: "paragonsdigital@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    
    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
