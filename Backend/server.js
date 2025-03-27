import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", methods: ["POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

// Email Sending Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Explicitly false for STARTTLS
      requireTLS: true, // Force TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true, // Keep true for production
      },
      connectionTimeout: 60000,
      socketTimeout: 60000,
      greetingTimeout: 30000,
    });

    // Email Options
    const mailOptions = {
      from: `"Paragons Digital" <${process.env.SMTP_USER}>`,
      to: "paragonsdigital@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      headers: {
        "X-Priority": "3",
        "X-Mailer": "NodeMailer",
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("❌ Email sending failed:", error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
      details: {
        code: error.code,
        response: error.response,
        stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
      },
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
