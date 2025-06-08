
import React from "react";
import Lottie from "lottie-react";

interface PageLoaderProps {
  onLoadingComplete: () => void;
  delay?: number;
}

export const PageLoader = ({ onLoadingComplete, delay = 3000 }: PageLoaderProps) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Load the waiting-finger-tapping animation immediately
    fetch("/waiting-finger-tapping.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Wait for specified delay before calling completion
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, delay);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, delay]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {animationData && (
          <Lottie
            animationData={animationData}
            className="w-32 h-32 mx-auto"
            loop={true}
            autoplay={true}
          />
        )}
      </div>
    </div>
  );
};
