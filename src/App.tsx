
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

// Simple loading component for the dashboard with Lottie animation
const DashboardLoader = () => {
  const [animationData, setAnimationData] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    fetch("/triple-card.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Ensure loader shows for at least 5 seconds to let animation complete
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return null;
  }

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

// Wrapper component to handle both lazy loading and animation timing
const DashboardWrapper = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for animation to complete before showing dashboard
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <DashboardLoader />;
  }

  return (
    <Suspense fallback={<div />}>
      <Dashboard />
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
