import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, json, Request, Response } from "express";
import "./env";
import { ZodSchema, z } from "zod";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);

    next();
  };

const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
type CreateUserSchema = z.infer<typeof CreateUserSchema>;

app.post(
  "/users",
  //   validate(CreateUserSchema),
  (req: Request<void, void, CreateUserSchema>, res) => {
    res.json({ message: "Hey" });
  }
);

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
