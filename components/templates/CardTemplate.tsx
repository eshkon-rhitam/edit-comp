import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TemplateEditor from "../template-editor";
import { useCallback, useState } from "react";
import { cardSchema } from "@/lib/schema/cardSchema";
import clsx from "clsx";
type CardItemType = {
  title: string;
  image: string;
  description: string;
  cardClass: string;
};
export default function CardTemplate() {
  const [cardStats, setCardStats] = useState({
    title: "Default Title",
    image: "",
    description: "This is a default card description.",
    cardClass: "",
  });
  const handleChange = useCallback((data: CardItemType) => {
    setCardStats(data);
  }, []);
  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <Card className={clsx("p-4 shadow-lg rounded-md", cardStats.cardClass)}>
          <CardTitle className="text-xl font-bold">{cardStats.title}</CardTitle>
          <CardDescription>{cardStats.description}</CardDescription>
        </Card>
      </div>
      <div className="w-64 border-l p-4">
        <TemplateEditor
          schema={cardSchema}
          initialData={cardStats}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
