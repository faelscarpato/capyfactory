"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
}

import * as React from "react"

interface ChartContextValue {
  config: Record<string, { label: string; color: string }>
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

interface ChartContainerProps {
  config: Record<string, { label: string; color: string }>
  className?: string
  children: React.ReactNode
}

export function ChartContainer({ config, className, children }: ChartContainerProps) {
  const contextValue = React.useMemo(() => ({ config }), [config])

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        className={className}
        style={
          {
            "--color-chart-foreground": "hsl(var(--foreground))",
            "--color-chart-grid": "hsl(var(--border))",
            ...Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color])),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    dataKey: string
    payload: Record<string, any>
  }>
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((data) => (
            <div key={data.dataKey} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: `var(--color-${data.dataKey})`,
                  }}
                />
                <span>{config[data.dataKey]?.label ?? data.name}</span>
              </div>
              <div className="text-xs font-medium">
                {typeof data.value === "number" ? data.value.toLocaleString() : data.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
