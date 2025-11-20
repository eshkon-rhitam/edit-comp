/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodType, ZodObject, ZodRawShape, ZodArray } from "zod";
import React, { useState, useEffect, useRef } from "react";

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

  // Sync formData with initialData when it changes
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

  // Handle array schemas:
  if (schema instanceof ZodArray) {
    const elementSchema = schema.element;
    const arrData = formData as unknown[];

    const handleElementChange = (index: number, data: any) => {
      const newArr = [...arrData];
      newArr[index] = data;
      setFormData(newArr as any);
    };

    const handleRemoveItem = (index: number) => {
      const newArr = arrData.filter((_, i) => i !== index);
      setFormData(newArr as any);
    };

    return (
      <div className="space-y-4">
        {arrData.map((item, index) => (
          <div key={index} className="p-4 border rounded relative">
            <button
              onClick={() => handleRemoveItem(index)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Remove
            </button>
            <TemplateEditor
              schema={elementSchema as any}
              initialData={item}
              onChange={(data) => handleElementChange(index, data)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Handle object schemas:
  if (schema instanceof ZodObject) {
    const shape: ZodRawShape = schema.shape;

    const renderInputs = () =>
      Object.entries(shape).map(([key, fieldSchema]) => {
        const fieldData = (formData as any)[key];
        const fieldType = (() => {
          if (fieldSchema instanceof z.ZodString) return "text";
          if (fieldSchema instanceof z.ZodNumber) return "number";
          if (fieldSchema instanceof z.ZodBoolean) return "checkbox";
          return "text";
        })();

        // Check if this is a multiline field (description, content, etc.)
        const isMultiline =
          key.toLowerCase().includes("description") ||
          key.toLowerCase().includes("content");

        // Check if this is a class field
        const isClassField = key.toLowerCase().includes("class");

        const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          let value: any = e.target.value;
          if (fieldType === "number") value = Number(value);
          if (fieldType === "checkbox")
            value = (e.target as HTMLInputElement).checked;
          setFormData({ ...formData, [key]: value });
        };

        return (
          <div key={key} className="mb-4">
            <label className="block font-semibold mb-1 capitalize text-sm">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            {fieldType === "checkbox" ? (
              <input
                type="checkbox"
                checked={fieldData ?? false}
                onChange={handleChange}
                className="mr-2"
              />
            ) : isMultiline ? (
              <textarea
                value={fieldData ?? ""}
                className="w-full border px-2 py-1 rounded min-h-20"
                onChange={handleChange}
                placeholder={`Enter ${key}...`}
              />
            ) : (
              <input
                type={fieldType}
                value={fieldData ?? ""}
                className="w-full border px-2 py-1 rounded"
                onChange={handleChange}
                placeholder={
                  isClassField
                    ? "e.g., bg-blue-500 text-white"
                    : `Enter ${key}...`
                }
              />
            )}
            {isClassField && (
              <p className="text-xs text-gray-500 mt-1">
                Add Tailwind classes separated by spaces
              </p>
            )}
          </div>
        );
      });

    return <div className="space-y-2">{renderInputs()}</div>;
  }

  return <div>Unsupported schema type</div>;
}
