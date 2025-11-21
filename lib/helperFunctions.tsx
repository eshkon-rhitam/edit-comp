import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
// Helper function to format field labels
export function formatLabel(key: string): string {
  const labelMap: Record<string, string> = {
    friendlyName: "Friendly Name",
    friendlyDescription: "Friendly Description",
    isVisible: "Visible",
    isEditable: "Editable",
    isFocusable: "Focusable",
    isFocussed: "Focused",
    isTrackable: "Trackable",
    openInNewTab: "Open in New Tab",
    url: "URL",
    cta: "Call to Action",
    title: "Title",
    description: "Description",
    image: "Image",
    value: "Content",
    template: "Template",
  };

  if (labelMap[key]) {
    return labelMap[key];
  }

  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

// Helper function to format option labels in select dropdowns
export function formatOptionLabel(option: string): string {
  return option
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Collapsible Section Component
export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="font-semibold text-gray-700">
            {formatLabel(title)}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 p-3 border rounded-lg bg-white">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
