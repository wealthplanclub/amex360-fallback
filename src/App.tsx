
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load the dashboard, rewards, and employee pages to completely separate them from the auth bundle
const Dashboard = lazy(() => import("./pages/Index"));
const Rewards = lazy(() => import("./pages/Rewards"));
const Employee = lazy(() => import("./pages/Employee"));

const queryClient = new QueryClient();

const App = () => {
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
                <Suspense fallback={null}>
                  <Dashboard />
                </Suspense>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
