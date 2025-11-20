import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cardClass: z.string().default(""),
  image: z.string().default(""),
});
