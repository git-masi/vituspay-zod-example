import bodyParser from "body-parser";
import express from "express";
import { authRouter } from "./auth/auth";
import { initTransactionsRouter } from "./transactions/transactions";

const app = express();
const port = 3000;
const transactionsRouter = initTransactionsRouter();

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use("/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
