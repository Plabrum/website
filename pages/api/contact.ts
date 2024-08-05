import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import {nodemailer} from nodemailer;
const nodemailer = require('nodemailer');

const mailConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
};

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  return await axios.post(verificationUrl);
};

async function getPubFile(file: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${file}`);
  return res.data;
}

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport(mailConfig);
  const admin = `Plabrum.com <${process.env.GMAIL_EMAIL_ADDRESS}`;
  const recipient = `${req.body.name} <${req.body.email}>`;

  // Format Templates
  // Fetch our template files
  const template = await getPubFile('/email_templates/template.html');
  const r_tempHtml = await getPubFile('/email_templates/r_temp.html');
  const custHtml = await getPubFile('/email_templates/customer.html');
  const adminHtml = await getPubFile('/email_templates/admin.html');
  const custTxt = await getPubFile('/email_templates/customer.txt');
  const adminTxt = await getPubFile('/email_templates/admin.txt');

  if (!(template && custHtml && adminHtml && custTxt && adminTxt)) {
    return res.status(500).json({
      error: 'Failed to get template',
    });
  }
  // Format our customer-bound email from received form data

  const escaped_text = req.body.message.replace(/\n/g, '<br />');

  const formatted_recipient_html = r_tempHtml
    .replace('%NAME%', req.body.name)
    .replace('%SUBJECT%', req.body.subject)
    .replace('%MESSAGE%', escaped_text);

  const formatted_recipient_text = custTxt
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  // Create Messages
  const recipientMessage = {
    from: admin,
    to: recipient,
    subject: `Thank you for reaching out at Plabrum.com: ${req.body.subject}`,
    text: formatted_recipient_text,
    html: formatted_recipient_html,
  };

  const formatted_admin_html = template
    .replace('%BODY%', adminHtml)
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  const formatted_admin_txt = adminTxt
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  const adminMessage = {
    from: admin,
    to: admin,
    subject: `Contact request from Plabrum.com: ${req.body.subject}`,
    text: formatted_admin_txt,
    html: formatted_admin_html,
  };

  const info = await transporter.sendMail(recipientMessage);
  const info2 = await transporter.sendMail(adminMessage);
  if (info.messageId && info2.messageId) {
    return res.status(200).json({ success: `Email sent!` });
  }
  if (info.rejected) {
    return res.status(400).json({
      error: `Unable to send email to: ${req.body.email}`,
    });
  }
  return res.status(501).json({
    error: info.response,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await verifyRecaptcha(req.body.token);

  if (response.data.success && response.data.score >= 0.5) {
    return sendEmail(req, res);
  }
  return res.status(502).json({
    error: 'Invalid Captcha',
  });
}
