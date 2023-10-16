import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Jimp from "jimp";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

import { User } from "../models/user.js";
import httpError from "../helpers/httpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";

dotenv.config();

const { SECRET_KEY, BASE_URL, PORT } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) throw httpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    s: "250",
    r: "pg",
    d: "mm",
  });
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="${BASE_URL}${PORT}/api/auth/verify/${verificationToken}" target="_blank">
    Verify email
    </a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw httpError(400, "Invalid verification code");
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.json({ message: "Email successfully verified" });
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="${BASE_URL}${PORT}/api/auth/verify/${user.verificationToken}" target="_blank">
    Verify email
    </a>`,
  };
  await sendEmail(verifyEmail);
  res.json({ message: "Email verify send success" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw httpError(400, "User not found");
  if (user.verify) throw httpError(400, "Email already verified");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw httpError(401, "Email is not verified");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  const responseUser = {
    email: user.email,
    subscription: user.subscription,
  };
  res.json({
    token,
    user: responseUser,
  });
};

const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription: newSubscription } = req.body;
  const { email, subscription } = await User.findByIdAndUpdate(
    _id,
    {
      subscription: newSubscription,
    },
    { new: true }
  );
  res.json({
    email,
    subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  const avatarsDir = path.join("public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
