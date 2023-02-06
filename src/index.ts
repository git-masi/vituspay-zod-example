import bodyParser from "body-parser";
import express from "express";
import { authRouter } from "./auth/auth";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
