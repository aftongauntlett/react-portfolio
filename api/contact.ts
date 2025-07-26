import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Rate limiting (simple in-memory store - in production use Redis/DB)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 emails per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().substring(0, 1000); // Limit length and trim
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check environment variables
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  if (!process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    console.error('Contact email addresses not configured');
    return res.status(500).json({ error: 'Email addresses not configured' });
  }

  // Rate limiting
  const clientIP =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    (req.headers['x-real-ip'] as string) ||
    'unknown';

  if (isRateLimited(clientIP)) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }

  try {
    // Parse and validate request body
    const { name, email, message }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address',
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Prepare email
    const msg = {
      to: process.env.CONTACT_TO_EMAIL,
      from: {
        email: process.env.CONTACT_FROM_EMAIL,
        name: 'Portfolio Contact Form',
      },
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: Message from ${sanitizedName}`,
      text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Message: ${sanitizedMessage}

--
Sent from your portfolio contact form
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <strong>Name:</strong> ${sanitizedName}
          </div>
          
          <div style="margin: 20px 0;">
            <strong>Email:</strong> 
            <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
          </div>
          
          <div style="margin: 20px 0;">
            <strong>Message:</strong>
          </div>
          
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007acc; margin: 10px 0;">
            ${sanitizedMessage.replace(/\n/g, '<br>')}
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="color: #666; font-size: 12px;">
            Sent from your portfolio contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('SendGrid error:', error);

    // Handle specific SendGrid errors
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: unknown } };
      console.error('SendGrid API error:', sgError.response?.body);
    }

    return res.status(500).json({
      error: 'Failed to send message. Please try again later.',
    });
  }
}
