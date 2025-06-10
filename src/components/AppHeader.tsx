
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>
      <img 
        src="https://i.imgur.com/1fFddP4.png" 
        alt="Amex Logo" 
        className="mx-auto"
        style={{ width: '276px' }}
      />
      <div className="w-[40px]"></div>
    </div>
  );
};
