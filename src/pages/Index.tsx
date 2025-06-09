
import React from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFilterState } from "@/hooks/useFilterState";
import { DashboardLoader } from "@/components/dashboard/DashboardLoader";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Index = () => {
  const isMobile = useIsMobile();
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isLoading, setIsLoading] = React.useState(true);
  const [animationData, setAnimationData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);

  // Always call useEffect hooks in the same order
  React.useEffect(() => {
    // Load the loading-geo-c animation
    fetch("/loading-geo-c.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Reduced loading time to 0.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start showing content with staggered animations
      setTimeout(() => setShowContent(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Add effect to log time range changes - always call this hook
  React.useEffect(() => {
    console.log("selectedTimeRange state changed to:", filters.selectedTimeRange, "isMobile:", isMobile);
  }, [filters.selectedTimeRange, isMobile]);

  // Early return after all hooks have been called
  if (isLoading) {
    return <DashboardLoader animationData={animationData} />;
  }

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
          backgroundRepeat: 'repeat'
        }}
      >
        <AppSidebar />
        
        {/* Header with Reset and Logout buttons */}
        <AppHeader />
        
        <div className="max-w-7xl mx-auto px-6 mb-8">
          {/* Header with Logo */}
          <DashboardHeader />
          
          {/* Main Dashboard Content */}
          <DashboardContent
            filters={filters}
            showContent={showContent}
            updateFilter={updateFilter}
            updateMultipleFilters={updateMultipleFilters}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
