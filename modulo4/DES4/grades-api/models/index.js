import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Grade from './gradesModel.js';

dotenv.config();
const db = {};
db.mongoose = mongoose;
db.url = process.env.LOCAL;
db.grade = Grade;

export { db };
