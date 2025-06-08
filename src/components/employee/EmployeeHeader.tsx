
import React from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function EmployeeHeader() {
  const { toast } = useToast()

  const handleRefresh = () => {
    setTimeout(() => {
      toast({
        title: "Data refreshed",
        description: "Employee data has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Employee Overview</h1>
        <p className="text-muted-foreground">
          Monitor employee card spending and activity
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  )
}
