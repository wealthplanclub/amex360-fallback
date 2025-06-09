
import React, { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./Index";
import Employee from "./Employee";
import Rewards from "./Rewards";
import CreditMax from "./CreditMax";

export type DashboardSection = "dashboard" | "rewards" | "employee" | "creditmax";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Index />;
      case "rewards":
        return <Rewards />;
      case "employee":
        return <Employee />;
      case "creditmax":
        return <CreditMax />;
      default:
        return <Index />;
    }
  };

  return (
    <>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <AppHeader />
        {renderSection()}
      </div>
    </>
  );
};

export default Dashboard;
