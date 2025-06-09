
import React from "react"
import Lottie from "lottie-react"

interface RewardsLoaderProps {
  animationData: any
  showLottie: boolean
}

export function RewardsLoader({ animationData, showLottie }: RewardsLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {animationData && showLottie && (
          <Lottie
            animationData={animationData}
            className="w-32 h-32 mx-auto"
            loop={true}
            autoplay={true}
          />
        )}
      </div>
    </div>
  )
}
