import { z } from "zod";
export const accordionSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  })
);
