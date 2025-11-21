import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TemplateEditor from "../template-editor";
import { useCallback, useState } from "react";
import { getDefaultSimpleCard, simpleCard } from "@/lib/types/cardPropTypes";
import clsx from "clsx";
import z from "zod";
import { Button } from "../ui/button";

type CardItemType = z.infer<typeof simpleCard>;

export default function CardTemplate() {
  const [cardStats, setCardStats] = useState<CardItemType>(
    getDefaultSimpleCard()
  );

  const handleChange = useCallback((data: CardItemType) => {
    setCardStats(data);
  }, []);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <Card
          className={clsx(
            "p-4 shadow-lg rounded-md max-w-[450px] mx-auto sticky top-5"
          )}
        >
          {cardStats.image.value && cardStats.image.isVisible && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardStats.image.value}
              alt="Card Image"
              className="rounded-lg mb-2"
            />
          )}
          {cardStats.title.isVisible && (
            <CardTitle className="text-xl font-bold">
              {cardStats.title.value}
            </CardTitle>
          )}
          {cardStats.description.isVisible && (
            <CardDescription>{cardStats.description.value}</CardDescription>
          )}
          {cardStats.cta.isVisible && (
            <Button variant={cardStats.cta.template ?? "default"}>
              <a href={cardStats.cta.url}>{cardStats.cta.value}</a>
            </Button>
          )}
        </Card>
      </div>
      <div className="min-w-[340px] border-l bg-white">
        <TemplateEditor
          schema={simpleCard}
          initialData={cardStats}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
