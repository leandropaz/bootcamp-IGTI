import { promises as fs } from "fs";
import calc from "../libs/calculations.js";

const controller = {
  getGrades: async () => {
    try {
      const json = JSON.parse(await fs.readFile(global.fileName));
      delete json.nextId;
      return json;
    } catch (error) {
      throw new Error(error);
    }
  },

  insertGrade: async (data) => {
    try {
      if (!data.student || !data.subject || !data.type || data.value == null) {
        throw new Error(
          "Nome do aluno, matéria, atividade e nota são obrigatórios."
        );
      }

      const json = JSON.parse(await fs.readFile(global.fileName));

      const grade = {
        id: json.nextId++,
        student: data.student,
        subject: data.subject,
        type: data.type,
        value: data.value,
        timestamp: new Date(),
      };
      json.grades.push(grade);

      await fs.writeFile(global.fileName, JSON.stringify(json, null, 2));

      return grade;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateGrade: async (data) => {
    try {
      if (
        !data.id ||
        !data.student ||
        !data.subject ||
        !data.type ||
        data.value == null
      ) {
        throw new Error(
          "Id, nome do aluno, matéria, atividade e nota são obrigatórios."
        );
      }
      const db = JSON.parse(await fs.readFile(global.fileName));
      const index = db.grades.findIndex((g) => data.id === g.id);

      if (index === -1) {
        throw new Error("Registro não encontrado.");
      }

      db.grades[index].student = data.student;
      db.grades[index].subject = data.subject;
      db.grades[index].type = data.type;
      db.grades[index].value = data.value;

      await fs.writeFile(global.fileName, JSON.stringify(db, null, 2));

      return db.grades[index];
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteGrade: async (data) => {
    try {
      const db = JSON.parse(await fs.readFile(global.fileName));
      db.grades = db.grades.filter((grade) => grade.id !== parseInt(data.id));
      await fs.writeFile(global.fileName, JSON.stringify(db, null, 2));
      return { delete: data.id };
    } catch (error) {
      throw new Error(error);
    }
  },

  getGrade: async (data) => {
    try {
      const db = JSON.parse(await fs.readFile(global.fileName));
      db.grades = db.grades.filter((grade) => grade.id === parseInt(data.id));
      return db.grades;
    } catch (error) {
      throw new Error(error);
    }
  },

  calculateSum: async (data) => {
    try {
      if (!data.student || !data.subject) {
        throw new Error("Aluno e matéria são parâmetros obrigatórios!");
      }
      const db = JSON.parse(await fs.readFile(global.fileName));
      let info = db.grades.filter(
        (obj) => obj.student === data.student && obj.subject === data.subject
      );
      info = info.map((i) => i.value);
      return { total: calc.sum(info) };
    } catch (error) {
      throw new Error(error);
    }
  },

  calculateMean: async (data) => {
    try {
      if (!data.type || !data.subject) {
        throw new Error("Atividade e matéria são parâmetros obrigatórios!");
      }
      const db = JSON.parse(await fs.readFile(global.fileName));
      let info = db.grades.filter(
        (obj) => obj.subject === data.subject && obj.type === data.type
      );
      info = info.map((i) => i.value);
      return { mean: calc.mean(info) };
    } catch (error) {
      throw new Error(error);
    }
  },

  bestGrades: async (data) => {
    try {
      if (!data.type || !data.subject) {
        throw new Error("Atividade e matéria são parâmetros obrigatórios!");
      }
      const db = JSON.parse(await fs.readFile(global.fileName));
      let info = db.grades.filter(
        (obj) => obj.subject === data.subject && obj.type === data.type
      );
      info = info.map((i) => i.value);
      info = info.sort((a, b) => b - a).splice(0, 3);
      return { bestGrades: info };
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default controller;
