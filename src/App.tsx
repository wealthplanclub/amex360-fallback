
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

// Wrapper component with controlled loading sequence
const DashboardWrapper = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [startDashboardLoad, setStartDashboardLoad] = useState(false);

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
    // Start loading the dashboard after animation completes
    setStartDashboardLoad(true);
  };

  // Show loader until animation is complete
  if (!animationComplete) {
    return <DashboardLoader onLoadingComplete={handleLoadingComplete} />;
  }

  // Show dashboard loading fallback briefly, then show dashboard
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>}>
      {startDashboardLoad && <Dashboard />}
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
