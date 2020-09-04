import express from "express";
import accountController from "../controllers/accountController.js";
const router = express.Router();

router.patch("/deposit", accountController.deposit);
router.get("/balance/", accountController.getBalance);
router.get("/balance/:agencia", accountController.mean);
router.get("/lowest/:quantidade", accountController.lowest);
router.get("/highest/:quantidade", accountController.highest);
router.patch("/withdraw", accountController.withdraw);
router.delete("/close", accountController.closeAccount);
router.put("/transfer", accountController.transfer);
router.options("/transfer", accountController.clientsTransfer);

export default router;
