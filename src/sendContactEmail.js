const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();

// Configure the email transport using SendGrid or another SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  // Validate required fields
  if (!data.name || !data.email || !data.serviceType) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required fields'
    );
  }

  // Prepare email content
  const mailOptions = {
    from: `"Paragons Digital Form" <${functions.config().gmail.email}>`,
    to: data.toEmail || 'paragonsdigital@gmail.com',
    subject: data.subject || `New Service Request: ${data.serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Service Request</h2>
        
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        
        <h3 style="color: #2563eb; margin-top: 20px;">Project Details</h3>
        <p>${data.details || 'No additional details provided'}</p>
        
        ${data.additionalInfo ? `
        <h3 style="color: #2563eb; margin-top: 20px;">Additional Information</h3>
        <ul>
          ${Object.entries(data.additionalInfo).map(([key, value]) => `
            <li><strong>${key}:</strong> ${value}</li>
          `).join('')}
        </ul>
        ` : ''}
        
        <p style="margin-top: 30px;">
          <a href="mailto:${data.email}" style="background-color: #2563eb; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Reply to Client
          </a>
        </p>
        
        <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
          This email was sent from your website contact form.
        </p>
      </div>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Unable to send email',
      error.message
    );
  }
});