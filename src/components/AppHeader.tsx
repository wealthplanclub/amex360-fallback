
import { Button } from "@/components/ui/button";
import { LogOut, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    // Reset the app by reloading the page
    window.location.reload();
  };

  const handleLogout = () => {
    // Navigate back to auth page
    navigate("/auth");
  };

  return (
    <div className="flex justify-between items-center w-full px-6 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
      
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
