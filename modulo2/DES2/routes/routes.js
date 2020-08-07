import express from "express";
import controller from "../controllers/gradesController.js";

global.fileName = "grades.json";
const router = express.Router();

router.get("/grade", async (_, res, next) => {
  try {
    res.send(await controller.getGrades());
  } catch (error) {
    next(error.message);
  }
});

router.get("/grade/:id", async (req, res, next) => {
  try {
    res.send(await controller.getGrade(req.params));
  } catch (error) {
    next(error.message);
  }
});

router.post("/grade", async (req, res, next) => {
  try {
    res.send(await controller.insertGrade(req.body));
  } catch (error) {
    next(error.message);
  }
});

router.put("/grade", async (req, res, next) => {
  try {
    res.send(await controller.updateGrade(req.body));
  } catch (error) {
    next(error.message);
  }
});

router.delete("/grade/:id", async (req, res, next) => {
  try {
    res.send(await controller.deleteGrade(req.params));
  } catch (error) {
    next(error.message);
  }
});

router.get("/total", async (req, res, next) => {
  try {
    res.send(await controller.calculateSum(req.query));
  } catch (error) {
    next(error.message);
  }
});

router.get("/mean", async (req, res, next) => {
  try {
    res.send(await controller.calculateMean(req.query));
  } catch (error) {
    next(error.message);
  }
});

router.get("/best", async (req, res, next) => {
  try {
    res.send(await controller.bestGrades(req.query));
  } catch (error) {
    next(error.message);
  }
});

router.use((err, req, res, _) => {
  console.error(`${req.method} ${req.baseUrl} - ${err}`);
  res.status(400).json(err);
});

export default router;
