import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER_EMAIL,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendEmail=async(to,subject,text,html)=>{
    try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.GMAIL_USER_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendEmailToUser=async(email,subject,text)=>{
    let htmlContent='<p>This is a test email sent with <b>Nodemailer</b> using OAuth2.</p>';
    await sendEmail(email,subject,text,htmlContent);
    console.log(`Email sent to ${email} with subject "${subject}"`);
};

export default sendEmailToUser;