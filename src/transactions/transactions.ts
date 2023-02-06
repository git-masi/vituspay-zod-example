import { Router } from "express";

export const transactionsRouter = Router();

transactionsRouter.get("/", (req, res) => {
  res.send("/");
});
