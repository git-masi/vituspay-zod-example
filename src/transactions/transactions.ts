import { Router } from "express";
import { ZodError } from "zod";
import { initDynamoDbRepository } from "./dynamoDb";
import { TransactionType } from "./types";

interface GetTransactionsActions {
  getTransactions: () => Promise<Array<TransactionType>>;
}

export function initTransactionsRouter() {
  const transactionsRouter = Router();
  const dynamodbRepository = initDynamoDbRepository();

  // =============
  // Refactor Note
  // =============
  // In the future when there are multiple functions that require these
  // arguments we can create a pipeline to initialize them rather than calling
  // then one bye one like this
  getTransactions(transactionsRouter, dynamodbRepository);

  return transactionsRouter;
}

function getTransactions(router: Router, actions: GetTransactionsActions) {
  router.get("/", async (req, res) => {
    try {
      res.send(await actions.getTransactions());
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.issues);
        res.sendStatus(400);
        return;
      }

      console.error(error);

      res.sendStatus(500);
    }
  });
}
