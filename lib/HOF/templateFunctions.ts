// /* eslint-disable @typescript-eslint/no-explicit-any */
// // cards
// // friendlyName
// // friendlyDescription
// // isVisible
// // isEditable
// // internalName
// // value
// // valueType
// // template

// import { z } from "zod";
// import { cardSchema } from "@/lib/schema/cardSchema";
// import { heroSchema } from "@/lib/schema/heroSchema";
// // import { accordionSchema } from "@/lib/schema/accordionSchema";

// type ComponentSchemas = {
//   [key: string]: z.ZodObject<any>;
// };

// // Map component names to their respective schemas
// const schemas: ComponentSchemas = {
//   card: cardSchema,
//   hero: heroSchema,
//   // accordion: accordionSchema,
// };

// type BaseProp = {
//   friendlyName: string;
//   friendlyDescription: string;
//   isVisible: boolean;
//   isEditable: boolean;
//   internalName: string;
//   value: string;
//   valueType: string;
//   template: string;
// };

// function createPropsFromSchema(
//   schema: z.ZodObject<any>,
//   templates?: Record<string, string>
// ): BaseProp[] {
//   const shape = schema.shape;
//   return Object.keys(shape).map((key) => {
//     return {
//       friendlyName: key.charAt(0).toUpperCase() + key.slice(1),
//       friendlyDescription: `Description for ${key}`,
//       isVisible: true,
//       isEditable: true,
//       internalName: key,
//       value: (shape[key] as any)._def.defaultValue
//         ? (shape[key] as any)._def.defaultValue.value
//         : "",
//       valueType: shape[key]._def.typeName || "string",
//       template: "light",
//     };
//   });
// }

// export function factoryCreateProps(componentName: string): BaseProp[] {
//   const schema = schemas[componentName];
//   if (!schema) {
//     throw new Error(`Unknown component schema: ${componentName}`);
//   }
//   return createPropsFromSchema(schema, templatesPerComponent[componentName]);
// }

// // Example usage:
// const cardProps = factoryCreateProps("card");
// console.log(cardProps);
