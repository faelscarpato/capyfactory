"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
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

const comprasMensaisData = [
  { month: "Jan", valor: 720000 },
  { month: "Fev", valor: 760000 },
  { month: "Mar", valor: 790000 },
  { month: "Abr", valor: 820000 },
  { month: "Mai", valor: 876500 },
]

const categoriaComprasData = [
  { name: "Matéria-Prima", valor: 520000 },
  { name: "Embalagens", valor: 180000 },
  { name: "Componentes", valor: 95000 },
  { name: "Serviços", valor: 81500 },
]

const fornecedoresData = [
  { name: "Fornecedor A", valor: 250000 },
  { name: "Fornecedor C", valor: 180000 },
  { name: "Fornecedor E", valor: 150000 },
  { name: "Fornecedor G", valor: 120000 },
  { name: "Outros", valor: 176500 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const chartConfig = {
  valor: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
}

export function ComprasDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Compras Mensais</CardTitle>
          <CardDescription>Evolução do valor de compras nos últimos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <BarChart data={comprasMensaisData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="valor" fill="var(--color-valor)" name="Valor (R$)" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compras por Categoria</CardTitle>
          <CardDescription>Distribuição de compras por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoriaComprasData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoriaComprasData.map((entry, index) => (
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
          <CardTitle>Top Fornecedores</CardTitle>
          <CardDescription>Principais fornecedores por valor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fornecedoresData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {fornecedoresData.map((entry, index) => (
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
