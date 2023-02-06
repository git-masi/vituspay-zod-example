import { Router, RequestHandler } from "express";
import { TransactionType } from "./types";

interface GetTransactionsActions {
  getTransactions: () => Promise<Array<TransactionType>>;
}

type TransactionsRepository = GetTransactionsActions;

export function initTransactionsRouter(repository: TransactionsRepository) {
  const transactionsRouter = Router();

  transactionsRouter.get("/", getTransactions(repository));

  return transactionsRouter;
}

function getTransactions(actions: GetTransactionsActions): RequestHandler {
  return async (req, res) => {
    try {
      res.send(await actions.getTransactions());
    } catch (error) {
      console.error(error);

      res.sendStatus(500);
    }
  };
}
