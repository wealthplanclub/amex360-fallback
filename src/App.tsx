
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
  const [dashboardReady, setDashboardReady] = useState(false);
  const location = useLocation();

  const handleLoadingComplete = () => {
    setAnimationComplete(true);
  };

  // Start loading dashboard immediately when wrapper mounts
  useEffect(() => {
    // Preload the dashboard component
    import("./pages/Index").then(() => {
      setDashboardReady(true);
    });
  }, []);

  // Check if we're coming from login (state passed from Auth component)
  const skipAnimation = location.state?.fromLogin;

  // If coming from login, skip animation and show dashboard immediately when ready
  if (skipAnimation && dashboardReady) {
    return (
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    );
  }

  // Show loader until animation is complete
  if (!animationComplete) {
    return <DashboardLoader onLoadingComplete={handleLoadingComplete} />;
  }

  // Show dashboard only when both animation is complete AND dashboard is ready
  return (
    <Suspense fallback={null}>
      {dashboardReady && <Dashboard />}
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
