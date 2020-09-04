import mongoose from "mongoose";
import account from "../models/accountModel.js";
import dotenv from 'dotenv';
dotenv.config();

const db = {
  url: process.env.ATLAS_MONGO,
  mongoose,
  account,
};

export { db };
