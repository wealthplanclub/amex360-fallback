
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to auth page (now at root)
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <SidebarTrigger />
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    </div>
  );
};
