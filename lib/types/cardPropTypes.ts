import z from "zod";
import { basePropSchema, ctaPropSchema } from "../schema/basePropsSchema";
const simpleCard = z.object({
  title: basePropSchema.extend({
    value: z.string().default("Benchmark Manager"),
  }),
  description: basePropSchema.extend({
    value: z
      .string()
      .default(
        "Transform valuation and cashflow data from ARGUS Enterprise into portfolio-to-market benchmarking and performance attribution."
      ),
  }),
  image: basePropSchema.extend({
    value: z
      .string()
      .default(
        "https://images.ctfassets.net/8jgyidtgyr4v/MT4UmRvxzjHtGGLwIo7Ia/3988db77c7b59dc34e00a4c3de5f4c92/image.png"
      ),
  }),
  cta: ctaPropSchema.extend({
    value: z.string().default("AGL - CTA - Benchmark Manager"),
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
