import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_PASSWORD } = process.env;

if (!EMAIL || !EMAIL_HOST || !EMAIL_PORT || !EMAIL_PASSWORD) {
  console.error("One or more required environment variables are missing.");
  process.exit(1);
}

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

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  try {
    await transport.sendMail(email);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};


export default sendEmail;
