import { db } from "../config/index.js";
// import

const Account = db.account;
const WITHDRAWAL_TAX = 1;
const TRANSFER_TAX = 8;

const accountController = {
  deposit: async (request, response) => {
    const { agencia, conta, valor } = request.body;

    try {
      const data = await Account.findOneAndUpdate(
        { agencia, conta },
        { $inc: { balance: valor } },
        { new: true }
      );
      if (!data) {
        response.status(404).json("Conta inexistente.");
      } else {
        response.json({ message: `Seu saldo é ${data.balance}` });
      }
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },

  getBalance: async (request, response) => {
    const { agencia, conta } = request.headers;

    try {
      const data = await Account.findOne({ agencia, conta });
      if (!data) {
        response.status(404).json("Conta inexistente.");
      } else {
        response.json(data.balance);
      }
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
  withdraw: async (request, response) => {
    const { agencia, conta, valor } = request.body;

    try {
      const total = WITHDRAWAL_TAX + Number(valor);
      const data = await Account.findOne({ agencia, conta });
      if (!data) {
        response.status(404).json(`Conta inexistente!`);
      } else {
        const newBalance = data.balance - total;
        const update = await Account.findOneAndUpdate(
          { agencia, conta },
          { $set: { balance: newBalance } },
          { new: true, runValidators: true }
        );
        response.json(`Saldo atual: ${update.balance}`);
      }
    } catch (error) {
      if (error.errors) {
        const { message } = error.errors.balance;
        response.status(422).json(message);
      } else {
        response
          .status(500)
          .json(`Houve um erro ao processar a transação: ${error}`);
      }
    }
  },
  closeAccount: async (request, response) => {
    const { agencia, conta } = request.body;
    try {
      const data = await Account.findOneAndDelete({ agencia, conta });
      if (!data) {
        response.status(404).json(`Conta inexistente!`);
      } else {
        const count = await Account.find({agencia}).count();
        response.json({ agencia: agencia, contas: count });
      }
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
  transfer: async (request, response) => {
    const { origem, destino, valor } = request.body;
    try {
      const sourceAccount = await Account.findOne({ conta: origem });
      const destinyAccount = await Account.findOne({ conta: destino });
      if (!sourceAccount || !destinyAccount) {
        const account = !sourceAccount ? origem : destino;
        response.status(404).json(`Conta ${account} inexistente!`);
      } else {
        const total =
          sourceAccount.agencia !== destinyAccount.agencia
            ? TRANSFER_TAX + valor
            : valor;
        const sourceBalance = sourceAccount.balance - total;
        const updatedSource = await Account.findByIdAndUpdate(
          { _id: sourceAccount._id },
          { $set: { balance: sourceBalance } },
          { new: true, runValidators: true }
        );

        await Account.updateOne(
          { _id: destinyAccount._id },
          { $inc: { balance: valor } }
        );

        response.json(`Saldo atual: ${updatedSource.balance}`);
      }
    } catch (error) {
      if (error.errors) {
        const { message } = error.errors.balance;
        response.status(422).json(message);
      } else {
        response
          .status(500)
          .json(`Houve um erro ao processar a transação: ${error}`);
      }
    }
  },
  mean: async (request, response) => {
    const { agencia } = request.params;
    const aggregateArray = [
      {
        $match: {
          agencia: Number(agencia),
        },
      },
      {
        $group: {
          _id: "$agencia",
          media: { $avg: "$balance" },
        },
      },
      {
        $unwind: "$media",
      },
      {
        $project: { _id: 0 },
      },
    ];
    try {
      const accounts = await Account.aggregate(aggregateArray);
      response.json(accounts[0]);
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
  lowest: async (request, response) => {
    const { quantidade } = request.params;
    try {
      const lowestBalances = await Account.find({}, "agencia conta balance")
        .sort({ balance: 1 })
        .limit(Number(quantidade));
      response.json(lowestBalances);
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
  highest: async (request, response) => {
    const { quantidade } = request.params;
    try {
      const highestBalances = await Account.find({})
        .sort({ balance: -1, name: 1 })
        .limit(Number(quantidade));
      response.json(highestBalances);
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
  clientsTransfer: async (request, response) => {
    const aggregateArray = [
      {
        $group: {
          _id: "$agencia",
          maior: { $max: "$balance" },
        },
      },
    ];

    try {
      const highers = await Account.aggregate(aggregateArray);
      const tops = [];
      for (const value of highers) {
        tops.push(Number(value.maior));
      }

      await Account.updateMany(
        { balance: { $in: tops } },
        { $set: { agencia: 99 } },
        { new: true }
      );

      const vipAccounts = await Account.find({ agencia: 99 });

      response.json(vipAccounts);
    } catch (error) {
      response
        .status(500)
        .json(`Houve um erro ao processar a transação: ${error}`);
    }
  },
};

export default accountController;
