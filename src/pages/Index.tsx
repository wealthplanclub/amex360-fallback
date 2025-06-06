
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img 
            src="https://i.imgur.com/QHGSn1z.png" 
            alt="Amex Logo" 
            className="mx-auto w-full max-w-[235px] h-auto"
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">R's Amex 360°</h1>
            <p className="text-muted-foreground">YTD view of spending across all cards</p>
          </div>
        </div>
        
        {/* Section Cards */}
        <SectionCards />
      </div>
    </div>
  );
};

export default Index;
