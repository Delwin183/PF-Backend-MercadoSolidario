const nodemailer = require("nodemailer");

const postEmail = async (body) => {
  const { email } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "USER_GOOGLE",
      pass: "PASS_GOOGLE",
    },
  });

  const msg = {
    from: "julianlopez43013@gmail.com",
    to: `${email}`,
    subject: "Hello ✔",
    text: "Hello world?",
  };

  return transporter.sendMail(msg);
};

module.exports = postEmail;
