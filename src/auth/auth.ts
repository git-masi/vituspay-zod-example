import { Router } from "express";
import { z } from "zod";

const Login = z.object({
  username: z.string(),
  password: z.string(),
});

export const authRouter = Router();

authRouter.get("/auth", (req, res) => {
  res.send("/auth");
});

authRouter.post("/auth/login", (req, res) => {
  try {
    Login.parse(req.body);

    res.send({ token: "abc123" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("errors: ", error.errors);
      res.sendStatus(400);
      return;
    }

    console.error(error);

    res.sendStatus(500);
  }
});
