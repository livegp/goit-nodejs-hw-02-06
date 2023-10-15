import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "live.gp@gmail.com",
  from: EMAIL,
  subject: "Test email",
  text: "Hello world",
};

const sendEmail = transport
  .sendMail(email)
  .then(() => console.log("Email sent"))
  .catch((err) => console.log(err.message));

export default sendEmail;
