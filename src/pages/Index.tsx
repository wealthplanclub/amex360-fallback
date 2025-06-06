
import { SectionCards } from "@/components/SectionCards";

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
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-foreground">R's Amex 360°</h1>
        </div>
        
        {/* Image below header */}
        <div className="text-center">
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
      </div>
    </div>
  );
};

export default Index;
