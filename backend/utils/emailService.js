import nodemailer from 'nodemailer';

// Check if email is properly configured
const isEmailConfigured = () => {
  return !!(
    process.env.EMAIL_HOST &&
    process.env.EMAIL_PORT &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS &&
    process.env.EMAIL_USER !== 'your-email@gmail.com' &&
    process.env.EMAIL_PASS !== 'your-app-password'
  );
};

// Create transporter
const createTransporter = () => {
  if (!isEmailConfigured()) {
    console.warn('Email not configured - emails will not be sent. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS in .env');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form notification to admin
export const sendContactEmail = async (contactMessage) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured - skipping admin notification');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${contactMessage.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactMessage.name}</p>
            <p><strong>Email:</strong> ${contactMessage.email}</p>
            ${contactMessage.phone ? `<p><strong>Phone:</strong> ${contactMessage.phone}</p>` : ''}
            ${contactMessage.company ? `<p><strong>Company:</strong> ${contactMessage.company}</p>` : ''}
            <p><strong>Service:</strong> ${contactMessage.service}</p>
            <p><strong>Budget:</strong> ${contactMessage.budget}</p>
            <p><strong>Subject:</strong> ${contactMessage.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${contactMessage.message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Submitted on ${new Date(contactMessage.createdAt).toLocaleString()}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin contact notification sent successfully');
  } catch (error) {
    console.error('Failed to send admin contact notification:', error.message);
  }
};

// Send confirmation email to user
export const sendContactConfirmation = async (contactMessage) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured - skipping user confirmation');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactMessage.email,
      subject: 'Thank you for contacting Freesip Software Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thank You for Contacting Us!</h2>
          <p>Dear ${contactMessage.name},</p>
          <p>Thank you for reaching out to Freesip Software Solutions. We have received your message and will get back to you within 24-48 hours.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${contactMessage.message}</p>
          </div>
          <p>If you have any urgent queries, please feel free to call us or send another email.</p>
          <br/>
          <p>Best regards,<br/>The Freesip Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;"/>
          <p style="color: #6b7280; font-size: 14px;">
            <strong>Freesip Software Solutions</strong><br/>
            Building innovative software solutions for modern businesses
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent successfully');
  } catch (error) {
    console.error('Failed to send user confirmation email:', error.message);
  }
};

// Send job application notification
export const sendJobApplicationEmail = async (application) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email not configured - skipping job application notification');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Job Application: ${application.position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Job Application</h2>
          <p><strong>Position:</strong> ${application.position}</p>
          <p><strong>Name:</strong> ${application.name}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Resume:</strong> ${application.resumeUrl || 'Attached'}</p>
          <p><strong>Cover Letter:</strong></p>
          <p>${application.coverLetter}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Job application notification sent successfully');
  } catch (error) {
    console.error('Failed to send job application notification:', error.message);
  }
};
