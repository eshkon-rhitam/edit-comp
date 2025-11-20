import { useState, useCallback } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import TemplateEditor from "../template-editor";
import { accordionSchema } from "@/lib/schema/accordianSchema";

type AccordionItemType = {
  id: string;
  title: string;
  content: string;
};

let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return `item-${Date.now()}-${idCounter}`;
};

export default function AccordionTemplate() {
  const [accordionData, setAccordionData] = useState<AccordionItemType[]>([
    {
      id: "item-1",
      title: "Default Item 1",
      content: "This is the first item.",
    },
  ]);

  const addNewItem = () => {
    const newItem: AccordionItemType = {
      id: generateId(),
      title: `New Item ${accordionData.length + 1}`,
      content: "New item content.",
    };
    setAccordionData([...accordionData, newItem]);
  };

  const handleChange = useCallback((data: AccordionItemType[]) => {
    setAccordionData(data);
  }, []);

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Accordion type="single" collapsible>
          {accordionData.map(({ id, title, content }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <button
          onClick={addNewItem}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Accordion Item
        </button>
      </div>

      <div className="w-64 border-l p-4">
        <TemplateEditor
          schema={accordionSchema}
          initialData={accordionData}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
