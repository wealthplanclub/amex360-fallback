
import React from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
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
  const [showLottie, setShowLottie] = React.useState(false);

  // Always call useEffect hooks in the same order
  React.useEffect(() => {
    // Load the loading-geo-c animation
    fetch("/loading-geo-c.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // a. delay loading by .5 seconds
    const initialDelay = setTimeout(() => {
      // b. start lottie
      setShowLottie(true);
      
      // c. load page for 2 seconds while lottie plays
      // d. only render page after lottie plays for 2 seconds
      const lottieTimer = setTimeout(() => {
        setIsLoading(false);
        // Start showing content with staggered animations
        setTimeout(() => setShowContent(true), 100);
      }, 2000);

      return () => clearTimeout(lottieTimer);
    }, 500);

    return () => clearTimeout(initialDelay);
  }, []);

  // Add effect to log time range changes - always call this hook
  React.useEffect(() => {
    console.log("selectedTimeRange state changed to:", filters.selectedTimeRange, "isMobile:", isMobile);
  }, [filters.selectedTimeRange, isMobile]);

  // Early return after all hooks have been called
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {animationData && showLottie && (
            <DashboardLoader animationData={animationData} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header with Reset and Logout buttons */}
        <AppHeader />
        
        <div 
          className="flex-1"
          style={{
            backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
            backgroundRepeat: 'repeat'
          }}
        >
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
      </div>
    </div>
  );
};

export default Index;
