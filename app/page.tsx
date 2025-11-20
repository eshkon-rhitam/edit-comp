"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

type ComponentKey = "Card" | "Accordion";

const CardTemplate = dynamic(
  () => import("@/components/templates/CardTemplate")
);
const AccordionTemplate = dynamic(
  () => import("@/components/templates/AccordionTemplate")
);

const templateMap: Record<ComponentKey, React.ComponentType> = {
  Card: CardTemplate,
  Accordion: AccordionTemplate,
};

export default function Page() {
  const selected = useSelector(
    (state: RootState) => state.component.selected
  ) as ComponentKey | null;

  const SelectedTemplate = selected ? templateMap[selected] : null;

  return (
    <div className="bg-pattern h-full">
      <SidebarTrigger />
      <div className="p-4">
        {SelectedTemplate ? (
          <SelectedTemplate />
        ) : (
          "Select a component from the sidebar"
        )}
      </div>
    </div>
  );
}
