"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
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

const qualityData = [
  { month: "Jan", refugo: 2.8, devolucoes: 0.7 },
  { month: "Fev", refugo: 2.6, devolucoes: 0.6 },
  { month: "Mar", refugo: 2.5, devolucoes: 0.5 },
  { month: "Abr", refugo: 2.4, devolucoes: 0.4 },
  { month: "Mai", refugo: 2.3, devolucoes: 0.3 },
]

const inspecoesTipoData = [
  { name: "Matéria-Prima", value: 35 },
  { name: "Processo", value: 45 },
  { name: "Produto Acabado", value: 20 },
]

const inspecoesResultadoData = [
  { name: "Aprovado", value: 85 },
  { name: "Reprovado", value: 10 },
  { name: "Pendente", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
const COLORS_RESULTADO = ["#00C49F", "#FF8042", "#FFBB28"]

const chartConfig = {
  refugo: {
    label: "Taxa de Refugo",
    color: "hsl(var(--chart-5))",
  },
  devolucoes: {
    label: "Taxa de Devoluções",
    color: "hsl(var(--chart-6))",
  },
}

export function QualidadeDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Indicadores de Qualidade</CardTitle>
          <CardDescription>Taxa de refugo e devoluções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
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

      <Card>
        <CardHeader>
          <CardTitle>Inspeções por Tipo</CardTitle>
          <CardDescription>Distribuição de inspeções por tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inspecoesTipoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {inspecoesTipoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} inspeções`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados das Inspeções</CardTitle>
          <CardDescription>Distribuição por resultado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inspecoesResultadoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {inspecoesResultadoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_RESULTADO[index % COLORS_RESULTADO.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} inspeções`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
