"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

type ComponentKey = "Card";

const CardTemplate = dynamic(
  () => import("@/components/templates/CardTemplate")
);

const templateMap: Record<ComponentKey, React.ComponentType> = {
  Card: CardTemplate,
};

export default function Page() {
  const selected = useSelector(
    (state: RootState) => state.component.selected
  ) as ComponentKey | null;

  const SelectedTemplate = selected ? templateMap[selected] : null;

  return (
    <div className="bg-pattern h-full w-full flex">
      <SidebarTrigger />
      <div className="h-full w-full">
        {SelectedTemplate ? (
          <SelectedTemplate />
        ) : (
          "Select a component from the sidebar"
        )}
      </div>
    </div>
  );
}
