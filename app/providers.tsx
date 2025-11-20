"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </Provider>
  );
}
