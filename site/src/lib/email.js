// Email service with multiple provider support
import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
};

// Email templates
const emailTemplates = {
  contactNotification: (data) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This message was sent from your portfolio website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from your portfolio website contact form.
    `,
  }),
  
  autoReply: (data) => ({
    subject: 'Thank you for your message - Vivek Kumar',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for your message. I've received your inquiry and will get back to you within 24 hours.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p>In the meantime, you can:</p>
        <ul>
          <li>Check out my <a href="https://www.linkedin.com/in/vivekkumar860/">LinkedIn profile</a></li>
          <li>View my <a href="https://github.com/vivekkumar860">GitHub projects</a></li>
          <li>Connect with me on <a href="https://www.linkedin.com/in/vivekkumar860/">LinkedIn</a></li>
        </ul>
        <p>Best regards,<br>Vivek Kumar</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 12px;">
          This is an automated response. Please don't reply to this email.
        </p>
      </div>
    `,
    text: `
Thank you for reaching out!

Hi ${data.name},

Thank you for your message. I've received your inquiry and will get back to you within 24 hours.

Your message:
${data.message}

In the meantime, you can:
- Check out my LinkedIn profile: https://www.linkedin.com/in/vivekkumar860/
- View my GitHub projects: https://github.com/vivekkumar860
- Connect with me on LinkedIn: https://www.linkedin.com/in/vivekkumar860/

Best regards,
Vivek Kumar

---
This is an automated response. Please don't reply to this email.
    `,
  }),
  
  adminNotification: (data) => ({
    subject: 'Admin Action Required - Contact Form',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Admin Notification</h2>
        <p>A new contact form submission requires your attention:</p>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>From:</strong> ${data.name} (${data.email})</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p><a href="${process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000/admin'}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View in Admin Dashboard</a></p>
      </div>
    `,
    text: `
Admin Notification

A new contact form submission requires your attention:

From: ${data.name} (${data.email})
Subject: ${data.subject}

Message:
${data.message}

View in Admin Dashboard: ${process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000/admin'}
    `,
  }),
};

// Email service class
class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  async initializeTransporter() {
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        this.transporter = nodemailer.createTransporter(emailConfig);
        await this.transporter.verify();
        this.isConfigured = true;
        // console.log('✅ Email service configured successfully');
      } else {
        // console.log('⚠️ Email service not configured - using mock mode');
        this.isConfigured = false;
      }
    } catch (error) {
      console.error('❌ Email service configuration failed:', error.message);
      this.isConfigured = false;
    }
  }

  async sendEmail(to, template, data) {
    try {
      if (!this.isConfigured) {
        // Mock email sending for development
        // console.log('📧 Mock email sent:', {
        //   to,
        //   template: template.name,
        //   data: { name: data.name, email: data.email, subject: data.subject }
        // });
        return { success: true, message: 'Email sent (mock mode)' };
      }

      const emailContent = template(data);
      
      const mailOptions = {
        from: `"Vivek Kumar Portfolio" <${process.env.SMTP_USER}>`,
        to,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      // console.log('📧 Email sent successfully:', {
      //   messageId: result.messageId,
      //   to,
      //   subject: emailContent.subject
      // });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async sendContactNotification(contactData) {
    const adminEmail = process.env.ADMIN_EMAIL || 'trainedvk1@gmail.com';
    
    // Send notification to admin
    await this.sendEmail(
      adminEmail,
      emailTemplates.contactNotification,
      contactData
    );

    // Send auto-reply to user
    await this.sendEmail(
      contactData.email,
      emailTemplates.autoReply,
      contactData
    );

    // Send admin dashboard notification if configured
    if (process.env.ADMIN_DASHBOARD_EMAIL) {
      await this.sendEmail(
        process.env.ADMIN_DASHBOARD_EMAIL,
        emailTemplates.adminNotification,
        contactData
      );
    }
  }

  async sendTestEmail(to) {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      subject: 'test',
      message: 'This is a test message to verify email functionality.'
    };

    return await this.sendEmail(
      to,
      emailTemplates.contactNotification,
      testData
    );
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export templates for direct use
export { emailTemplates }; 