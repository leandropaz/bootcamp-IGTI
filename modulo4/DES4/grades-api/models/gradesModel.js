import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gradesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const Grade = mongoose.model('grade', gradesSchema);

export default Grade;
