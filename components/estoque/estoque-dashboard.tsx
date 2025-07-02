"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const inventoryData = [
  { name: "Matéria-Prima", value: 850000 },
  { name: "Produto Acabado", value: 720000 },
  { name: "Embalagens", value: 180000 },
  { name: "Peças de Reposição", value: 126450 },
]

const giroEstoqueData = [
  { month: "Jan", giro: 4.7 },
  { month: "Fev", giro: 4.8 },
  { month: "Mar", giro: 4.9 },
  { month: "Abr", giro: 5.0 },
  { month: "Mai", giro: 5.2 },
]

const materiaPrimaData = [
  { name: "Resina", value: 520000 },
  { name: "Pigmento", value: 150000 },
  { name: "Aditivo", value: 100000 },
  { name: "Embalagem", value: 80000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const chartConfig = {
  giro: {
    label: "Giro",
    color: "hsl(var(--chart-1))",
  },
}

export function EstoqueDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Giro de Estoque</CardTitle>
          <CardDescription>Evolução do giro de estoque nos últimos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart data={giroEstoqueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="giro" stroke="var(--color-giro)" name="Giro de Estoque" />
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

      <Card>
        <CardHeader>
          <CardTitle>Matéria-Prima por Tipo</CardTitle>
          <CardDescription>Distribuição por tipo de matéria-prima</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materiaPrimaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {materiaPrimaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
