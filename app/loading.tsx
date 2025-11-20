import { cn } from "@/lib/utils";

export default function Loading({ classname }: { classname?: string }) {
  return (
    <section
      className={cn("w-dvw h-[50dvh] grid place-items-center", classname)}
    >
      <div className="loader"></div>
    </section>
  );
}
