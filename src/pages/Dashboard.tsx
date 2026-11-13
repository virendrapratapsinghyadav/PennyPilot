
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/App-sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
