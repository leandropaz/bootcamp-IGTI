import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: [0, 'Saldo insuficiente.'],
  },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
