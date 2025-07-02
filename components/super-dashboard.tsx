"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const revenueData = [
  { month: "Jan", receita: 980000, custos: 720000 },
  { month: "Fev", receita: 1050000, custos: 760000 },
  { month: "Mar", receita: 1120000, custos: 790000 },
  { month: "Abr", receita: 1180000, custos: 820000 },
  { month: "Mai", receita: 1245000, custos: 876500 },
]

const productionData = [
  { month: "Jan", planejado: 12500, realizado: 11800 },
  { month: "Fev", planejado: 13000, realizado: 12700 },
  { month: "Mar", planejado: 13500, realizado: 13100 },
  { month: "Abr", planejado: 14000, realizado: 13600 },
  { month: "Mai", planejado: 14500, realizado: 14200 },
]

const inventoryData = [
  { name: "Matéria-Prima", value: 850000 },
  { name: "Produto Acabado", value: 720000 },
  { name: "Embalagens", value: 180000 },
  { name: "Peças de Reposição", value: 126450 },
]

const qualityData = [
  { month: "Jan", refugo: 2.8, devolucoes: 0.7 },
  { month: "Fev", refugo: 2.6, devolucoes: 0.6 },
  { month: "Mar", refugo: 2.5, devolucoes: 0.5 },
  { month: "Abr", refugo: 2.4, devolucoes: 0.4 },
  { month: "Mai", refugo: 2.3, devolucoes: 0.3 },
]

const chartConfig = {
  receita: {
    label: "Receita",
    color: "hsl(var(--chart-1))",
  },
  custos: {
    label: "Custos",
    color: "hsl(var(--chart-2))",
  },
  planejado: {
    label: "Planejado",
    color: "hsl(var(--chart-3))",
  },
  realizado: {
    label: "Realizado",
    color: "hsl(var(--chart-4))",
  },
  refugo: {
    label: "Taxa de Refugo",
    color: "hsl(var(--chart-5))",
  },
  devolucoes: {
    label: "Taxa de Devoluções",
    color: "hsl(var(--chart-6))",
  },
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function SuperDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Receita vs Custos</CardTitle>
          <CardDescription>Evolução mensal da receita e custos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="receita" fill="var(--color-receita)" name="Receita" />
                <Bar dataKey="custos" fill="var(--color-custos)" name="Custos" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produção</CardTitle>
          <CardDescription>Planejado vs Realizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart data={productionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="planejado" stroke="var(--color-planejado)" name="Planejado" />
                <Line type="monotone" dataKey="realizado" stroke="var(--color-realizado)" name="Realizado" />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Composição do Inventário</CardTitle>
          <CardDescription>Distribuição por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Indicadores de Qualidade</CardTitle>
          <CardDescription>Taxa de refugo e devoluções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart data={qualityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="refugo" stroke="var(--color-refugo)" name="Taxa de Refugo (%)" />
                <Line
                  type="monotone"
                  dataKey="devolucoes"
                  stroke="var(--color-devolucoes)"
                  name="Taxa de Devoluções (%)"
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
