
import React from "react"
import { Zap } from "lucide-react"

export function CreditMaxHeader() {
  return (
    <div className="flex items-center gap-3 pt-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
        <Zap className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CreditMax</h1>
        <p className="text-gray-600">Swap transaction management and analytics</p>
      </div>
    </div>
  )
}
