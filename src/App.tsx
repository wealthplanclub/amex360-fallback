
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Lottie from "lottie-react";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load the dashboard to completely separate it from the auth bundle
const Dashboard = lazy(() => import("./pages/Index"));

const queryClient = new QueryClient();

// Enhanced loading component with controlled timing
const DashboardLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/triple-card.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Let animation run for 5 seconds, then signal completion
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {animationData && (
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
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dashboardReady, setDashboardReady] = useState(false);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
  };

  // Start loading dashboard when animation starts
  useEffect(() => {
    if (!animationComplete) {
      // Preload the dashboard component
      import("./pages/Index").then(() => {
        setDashboardReady(true);
      });
    }
  }, [animationComplete]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
