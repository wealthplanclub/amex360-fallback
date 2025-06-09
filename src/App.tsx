
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Lottie from "lottie-react";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load the dashboard, rewards, employee, and creditmax pages
const Dashboard = lazy(() => import("./pages/Index"));
const Rewards = lazy(() => import("./pages/Rewards"));
const Employee = lazy(() => import("./pages/Employee"));
const CreditMax = lazy(() => import("./pages/CreditMax"));

const queryClient = new QueryClient();

// Enhanced loading component with controlled timing
const DashboardLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [animationData, setAnimationData] = useState(null);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    // Load animation data
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
        onLoadingComplete();
      }, 2000);

      return () => clearTimeout(lottieTimer);
    }, 500);

    return () => clearTimeout(initialDelay);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {animationData && showLottie && (
          <Lottie
            animationData={animationData}
            className="w-24 h-24 mx-auto mb-4"
            loop={true}
            autoplay={true}
          />
        )}
      </div>
    </div>
  );
};

const App = () => {
  // All useState hooks must be at the top level and unconditional
  const [animationComplete, setAnimationComplete] = useState(() => {
    // Check if animation has been shown before in this session
    return sessionStorage.getItem('lottieShown') === 'true';
  });
  const [dashboardReady, setDashboardReady] = useState(false);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
    // Mark animation as shown in session storage
    sessionStorage.setItem('lottieShown', 'true');
  };

  // Start loading dashboard when animation starts or if already completed
  useEffect(() => {
    if (!dashboardReady) {
      // Preload the dashboard component
      import("./pages/Index").then(() => {
        setDashboardReady(true);
      });
    }
  }, [dashboardReady]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route 
                path="/dashboard" 
                element={
                  !animationComplete ? (
                    <DashboardLoader onLoadingComplete={handleLoadingComplete} />
                  ) : (
                    <Suspense fallback={null}>
                      {dashboardReady && <Dashboard />}
                    </Suspense>
                  )
                } 
              />
              <Route 
                path="/rewards" 
                element={
                  <Suspense fallback={null}>
                    <Rewards />
                  </Suspense>
                } 
              />
              <Route 
                path="/employee" 
                element={
                  <Suspense fallback={null}>
                    <Employee />
                  </Suspense>
                } 
              />
              <Route 
                path="/creditmax" 
                element={
                  <Suspense fallback={null}>
                    <CreditMax />
                  </Suspense>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
