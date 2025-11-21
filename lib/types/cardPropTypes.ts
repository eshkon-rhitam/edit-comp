import z from "zod";
import {
  basePropSchema,
  ctaPropSchema,
  focusablePropSchema,
} from "../schema/basePropsSchema";
const simpleCard = z.object({
  title: basePropSchema,
  description: basePropSchema,
  image: basePropSchema,
  cta: ctaPropSchema.extend({
    template: z
      .enum(["link", "default", "destructive", "outline", "secondary", "ghost"])
      .default("outline"),
  }),
});
const getDefaultSimpleCard = () => {
  return simpleCard.parse(
    Object.keys(simpleCard.shape).reduce((acc, key) => {
      acc[key] = {};
      return acc;
    }, {} as Record<string, object>)
  );
};
export { simpleCard, getDefaultSimpleCard };
