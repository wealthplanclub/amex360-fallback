
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <SidebarTrigger />
    </div>
  );
};
