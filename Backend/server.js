import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createRequire } from 'module';

// Create require for ES module
const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express();

// ======================
// Security Middleware
// ======================
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// ======================
// CORS Configuration
// ======================
const corsOptions = {
  origin: [
    /\.yourdomain\.com$/,
    /\.vercel\.app$/,
    'http://localhost:[0-9]+',
    'http://127.0.0.1:[0-9]+'
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ======================
// Rate Limiting
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ======================
// SMTP Configuration
// ======================
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      minVersion: "TLSv1.2",
      // For localhost testing only - remove in production
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
    greetingTimeout: 5000,
    logger: true,
    debug: process.env.NODE_ENV === 'development'
  });
};

// ======================
// Routes
// ======================

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    smtpConfigured: !!process.env.SMTP_USER
  });
});

// SMTP Test Endpoint
app.get('/test-smtp', async (req, res) => {
  const transporter = createTransporter();
  
  try {
    await transporter.verify();
    res.json({ 
      success: true, 
      message: "SMTP connection verified successfully" 
    });
  } catch (error) {
    console.error("SMTP Verification Error:", error);
    res.status(500).json({ 
      success: false,
      message: "SMTP connection failed",
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Email Sending Endpoint
app.post("/send-email", async (req, res) => {
  // Validate headers
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(415).json({ 
      success: false, 
      message: "Content-Type must be application/json" 
    });
  }

  // Validate body
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields (name, email, message) are required" 
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid email format" 
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({ 
      success: false, 
      message: "Message exceeds 2000 character limit" 
    });
  }

  const transporter = createTransporter();
  
  try {
    // Prepare email
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL || "paragonsdigital@gmail.com",
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 10px; border-left: 3px solid #ccc; margin: 10px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="font-size: 0.8em; color: #666;">
            Sent from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
          </p>
        </div>
      `,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'NodeMailer',
        'X-Originating-IP': req.headers['x-forwarded-for'] || req.socket.remoteAddress
      }
    };

    // Send with timeout
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Email sending timeout (8 seconds exceeded)'));
      }, 8000);
    });

    await Promise.race([sendPromise, timeoutPromise]);

    console.log("✅ Email sent successfully!");
    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        details: {
          code: error.code,
          response: error.response,
          stack: error.stack
        }
      })
    });
  }
});

// ======================
// Server Startup
// ======================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`SMTP User: ${process.env.SMTP_USER ? 'Configured' : 'Not configured'}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
