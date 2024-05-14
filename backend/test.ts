import { NextFunction } from "express";
import { ZodSchema, z } from "zod";

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

type Post = (url: string, ...args: any) => void;

interface App {
  post: Post;
}
const app: App = {
  post: () => {},
};

app.post(
  "/users",
  validate(CreateUserSchema),
  (req: Request<void, void, CreateUserSchema>, res) => {
    res.json({ message: "Hey" });
  }
);
