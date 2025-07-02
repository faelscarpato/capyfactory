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
  CartesianGrid,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const funcionariosDepartamentoData = [
  { name: "Produção", value: 45 },
  { name: "Administrativo", value: 12 },
  { name: "Comercial", value: 8 },
  { name: "Engenharia", value: 6 },
  { name: "Qualidade", value: 5 },
  { name: "Outros", value: 14 },
]

const funcionariosStatusData = [
  { name: "Ativo", value: 78 },
  { name: "Férias", value: 8 },
  { name: "Afastado", value: 4 },
]

const admissoesDesligamentosData = [
  { month: "Jan", admissoes: 3, desligamentos: 1 },
  { month: "Fev", admissoes: 2, desligamentos: 2 },
  { month: "Mar", admissoes: 4, desligamentos: 1 },
  { month: "Abr", admissoes: 3, desligamentos: 2 },
  { month: "Mai", admissoes: 5, desligamentos: 3 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]
const STATUS_COLORS = ["#00C49F", "#FFBB28", "#FF8042"]

const chartConfig = {
  admissoes: {
    label: "Admissões",
    color: "hsl(var(--chart-3))",
  },
  desligamentos: {
    label: "Desligamentos",
    color: "hsl(var(--chart-2))",
  },
}

export function RHDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Admissões e Desligamentos</CardTitle>
          <CardDescription>Evolução mensal de admissões e desligamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <BarChart data={admissoesDesligamentosData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="admissoes" fill="var(--color-admissoes)" name="Admissões" />
                <Bar dataKey="desligamentos" fill="var(--color-desligamentos)" name="Desligamentos" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funcionários por Departamento</CardTitle>
          <CardDescription>Distribuição por departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={funcionariosDepartamentoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {funcionariosDepartamentoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} funcionários`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funcionários por Status</CardTitle>
          <CardDescription>Distribuição por status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={funcionariosStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {funcionariosStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} funcionários`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
