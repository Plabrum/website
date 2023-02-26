import type { NextApiRequest, NextApiResponse } from "next";
// import {nodemailer} from nodemailer;
const nodemailer = require("nodemailer");
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //   res.status(200).json(req.body);
  //   console.log();
  const message = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: [req.body.email, process.env.GMAIL_EMAIL_ADDRESS],
    subject: req.body.subject,
    // envelope: {
    //   from: process.env.GMAIL_EMAIL_ADDRESS, // used as MAIL FROM: address for SMTP
    //   to: req.body.email, // used as RCPT TO: address for SMTP
    // },
    text: req.body.message,
    html: `<p>${req.body.message}</p>`,
  };

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  if (req.method === "POST") {
    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err.address}`,
        });
      } else {
        res.status(200).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
  }
}

// const nodemailer = require("nodemailer");

// // Config
// const mailConfig = {
//   host: "smtp.gmail.com",
//   port: 465, // or 587
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.NEXT_PUBLIC_GMAIL_USER, // your gmail account
//     pass: process.env.NEXT_PUBLIC_GMAIL_PASS, // your gmail app password
//   },
// };

// const adminEmail = "The Webmaster <example@gmail.com>";

// // Function for grabbing template files
// async function getPubFile(file) {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${file}`);
//   return res.data;
// }

// async function sendEmails(req, res) {
//   // Create our Nodemailer transport handler
//   let transporter = nodemailer.createTransport(mailConfig);

//   // Fetch our template files
//   const template = await getPubFile("/email-templates/template.html");
//   const custHtml = await getPubFile("/email-templates/customer.html");
//   const adminHtml = await getPubFile("/email-templates/admin.html");
//   const custTxt = await getPubFile("/email-templates/customer.txt");
//   const adminTxt = await getPubFile("/email-templates/admin.txt");

//   // Format our recipient email address
//   const recipEmail = `${req.body.name} <${req.body.email}>`;

//   // Format our customer-bound email from received form data
//   let sendHtml = template
//     .replace("%BODY%", custHtml)
//     .replace("%NAME%", req.body.name)
//     .replace("%EMAIL%", req.body.email)
//     .replace("%MESSAGE%", req.body.message);

//   let sendTxt = custTxt
//     .replace("%NAME%", req.body.name)
//     .replace("%EMAIL%", req.body.email)
//     .replace("%MESSAGE%", req.body.message);

//   // Send our customer-bound email
//   let info = await transporter.sendMail({
//     from: adminEmail,
//     to: recipEmail, // list of receivers
//     subject: "Message Received ✔", // Subject line
//     text: sendTxt, // plain text body
//     html: sendHtml, // html body
//   });

//   if (!info.messageId) {
//     res.status(200).json({ status: 0, message: "Failed to send message!" });
//     return false;
//   }

//   sendHtml = template
//     .replace("%BODY%", adminHtml)
//     .replace("%NAME%", req.body.name)
//     .replace("%EMAIL%", req.body.email)
//     .replace("%MESSAGE%", req.body.message);

//   sendTxt = adminTxt
//     .replace("%NAME%", req.body.name)
//     .replace("%EMAIL%", req.body.email)
//     .replace("%MESSAGE%", req.body.message);

//   info = await transporter.sendMail({
//     from: recipEmail,
//     to: adminEmail, // list of receivers
//     subject: req.body.subject ? req.body.subject : "New Message From Website ✔", // Subject line
//     text: sendTxt, // plain text body
//     html: sendHtml, // html body
//   });

//   if (info.messageId) {
//     res.status(200).json({ status: 1 });
//   } else {
//     res.status(200).json({ status: 0, message: "Failed to send message!" });
//   }
// }
