import z from "zod";
const basePropSchema = z.object({
  friendlyName: z.string().default(""),
  friendlyDescription: z.string().default(""),
  internalName: z.string().default(""),
  isVisible: z.boolean().default(true),
  isEditable: z.boolean().default(true),
  value: z.string().default(""),
  valueType: z.string().default("string"),
  template: z.enum(["light", "dark"]).default("light"),
});
const focusablePropSchema = basePropSchema.extend({
  isFocusable: z.boolean().default(true),
  isFocussed: z.boolean().default(false),
});
const ctaPropSchema = basePropSchema.extend({
  url: z.string().default(""),
  openInNewTab: z.boolean().default(false),
  isTrackable: z.boolean().default(false),
});
export { basePropSchema, focusablePropSchema, ctaPropSchema };
