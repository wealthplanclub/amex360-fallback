
import { SectionCards } from "@/components/SectionCards";
import { CardSpendGrid } from "@/components/CardSpendGrid";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

const Index = () => {
  return (
    <div 
      className="min-h-screen p-6"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Image */}
        <div className="text-center mt-4">
          <img 
            src="https://i.imgur.com/dZJ4pLl.png" 
            alt="Amex Logo" 
            className="mx-auto w-full max-w-[235px] h-auto"
          />
        </div>
        
        {/* Section Cards */}
        <div className="mt-8">
          <SectionCards />
        </div>

        {/* Daily Spending Chart */}
        <div className="mt-8 px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>

        {/* Card Spend Grid */}
        <div className="mt-8">
          <CardSpendGrid />
        </div>
      </div>
    </div>
  );
};

export default Index;
