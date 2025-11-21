/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodType, ZodObject, ZodRawShape, ZodArray } from "zod";
import React, { useState, useEffect, useRef } from "react";
import {
  CollapsibleSection,
  formatLabel,
  formatOptionLabel,
} from "@/lib/helperFunctions";

type TemplateEditorProps<T extends ZodType<any, any>> = {
  schema: T;
  initialData: z.infer<T>;
  onChange: (data: z.infer<T>) => void;
};

export default function TemplateEditor<T extends ZodType<any, any>>({
  schema,
  initialData,
  onChange,
}: TemplateEditorProps<T>) {
  const [formData, setFormData] = useState<z.infer<T>>(initialData);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onChange(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  if (schema instanceof ZodArray) {
    const elementSchema = schema.element;
    const arrData = formData as unknown[];

    const handleElementChange = (index: number, data: any) => {
      const newArr = [...arrData];
      newArr[index] = data;
      setFormData(newArr as any);
    };

    return (
      <div className="h-full overflow-hidden">
        <div className="space-y-4 p-4 h-full overflow-y-auto">
          {arrData.map((item, index) => (
            <div key={index} className="relative">
              <TemplateEditor
                schema={elementSchema as any}
                initialData={item}
                onChange={(data) => handleElementChange(index, data)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (schema instanceof ZodObject) {
    const shape: ZodRawShape = schema.shape;

    return (
      <div className="h-full overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {Object.entries(shape).map(([key, fieldSchema]) => {
            const fieldData = (formData as any)[key];

            // Recursive rendering for nested objects with collapsible
            if (
              fieldSchema instanceof ZodObject ||
              fieldSchema instanceof ZodArray
            ) {
              return (
                <CollapsibleSection key={key} title={key} defaultOpen={true}>
                  <TemplateEditor
                    schema={fieldSchema as any}
                    initialData={fieldData}
                    onChange={(nested) =>
                      setFormData({ ...formData, [key]: nested })
                    }
                  />
                </CollapsibleSection>
              );
            }

            // Determine field type (using the working logic from old template)
            const fieldType = (() => {
              let unwrappedSchema: any = fieldSchema;

              while (
                unwrappedSchema.def?.typeName === "ZodDefault" ||
                unwrappedSchema.type === "default"
              ) {
                unwrappedSchema =
                  unwrappedSchema.def?.innerType || unwrappedSchema;
              }

              // Check for enum first
              if (
                unwrappedSchema instanceof z.ZodEnum ||
                unwrappedSchema.def?.typeName === "ZodEnum"
              ) {
                return "select";
              }

              if (
                unwrappedSchema instanceof z.ZodBoolean ||
                unwrappedSchema.def?.typeName === "ZodBoolean"
              )
                return "checkbox";
              if (
                unwrappedSchema instanceof z.ZodNumber ||
                unwrappedSchema.def?.typeName === "ZodNumber"
              )
                return "number";
              if (
                unwrappedSchema instanceof z.ZodString ||
                unwrappedSchema.def?.typeName === "ZodString"
              )
                return "text";

              return "text";
            })();

            // Get enum options if it's a select
            const enumOptions = (() => {
              if (fieldType !== "select") return undefined;

              let unwrappedSchema: any = fieldSchema;
              while (
                unwrappedSchema.def?.typeName === "ZodDefault" ||
                unwrappedSchema.type === "default"
              ) {
                unwrappedSchema =
                  unwrappedSchema.def?.innerType || unwrappedSchema;
              }

              // Try multiple possible locations for enum values
              const values =
                unwrappedSchema.def?.values ||
                unwrappedSchema._def?.values ||
                unwrappedSchema.options ||
                [];

              console.log("Enum unwrapped schema:", unwrappedSchema);
              console.log("Enum values:", values);

              return values;
            })();

            // Hide metadata fields
            const isMetadataField = ["internalName", "valueType"].includes(key);

            const isMultiline =
              key === "friendlyDescription" ||
              key.toLowerCase().includes("description") ||
              key.toLowerCase().includes("content");

            const handleChange = (
              e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => {
              let value: any = e.target.value;
              if (fieldType === "number") value = Number(value);
              if (fieldType === "checkbox")
                value = (e.target as HTMLInputElement).checked;
              setFormData({ ...formData, [key]: value });
            };

            // Hide internal metadata fields
            if (isMetadataField) {
              return null;
            }

            return (
              <div key={key} className="flex items-center gap-3">
                {fieldType === "checkbox" ? (
                  <>
                    <input
                      type="checkbox"
                      id={key}
                      checked={!!fieldData}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    />
                    <label
                      htmlFor={key}
                      className="font-medium text-sm flex-1 cursor-pointer select-none"
                    >
                      {formatLabel(key)}
                    </label>
                  </>
                ) : fieldType === "select" && enumOptions ? (
                  <div className="flex-1">
                    <label className="font-medium text-sm mb-1 block">
                      {formatLabel(key)}
                    </label>
                    <select
                      value={fieldData ?? ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                    >
                      {enumOptions.map((option: string) => (
                        <option key={option} value={option}>
                          {formatOptionLabel(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex-1">
                    <label className="font-medium text-sm mb-1 block">
                      {formatLabel(key)}
                    </label>
                    {isMultiline ? (
                      <textarea
                        value={fieldData ?? ""}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        onChange={handleChange}
                        placeholder={`Enter ${formatLabel(
                          key
                        ).toLowerCase()}...`}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={fieldType}
                        value={fieldData ?? ""}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={handleChange}
                        placeholder={`Enter ${formatLabel(
                          key
                        ).toLowerCase()}...`}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Unsupported schema type</div>;
}
