
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>
      <img 
        src="https://i.imgur.com/fCxU0In.png" 
        alt="Logo" 
        className="h-8"
      />
      <div className="w-[40px]"></div>
    </div>
  );
};
