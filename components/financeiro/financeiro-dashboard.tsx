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

const fluxoCaixaData = [
  { month: "Jan", receitas: 980000, despesas: 720000, saldo: 260000 },
  { month: "Fev", receitas: 1050000, despesas: 760000, saldo: 290000 },
  { month: "Mar", receitas: 1120000, despesas: 790000, saldo: 330000 },
  { month: "Abr", receitas: 1180000, despesas: 820000, saldo: 360000 },
  { month: "Mai", receitas: 1245000, despesas: 876500, saldo: 368500 },
]

const receitasDespesasData = [
  { name: "Vendas", value: 1245000 },
  { name: "Serviços", value: 120000 },
  { name: "Outros", value: 45000 },
]

const despesasCategoriaData = [
  { name: "Matéria-Prima", value: 520000 },
  { name: "Folha de Pagamento", value: 180000 },
  { name: "Energia", value: 75000 },
  { name: "Manutenção", value: 45000 },
  { name: "Outros", value: 56500 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const chartConfig = {
  receitas: {
    label: "Receitas",
    color: "hsl(var(--chart-3))",
  },
  despesas: {
    label: "Despesas",
    color: "hsl(var(--chart-2))",
  },
  saldo: {
    label: "Saldo",
    color: "hsl(var(--chart-1))",
  },
}

export function FinanceiroDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Fluxo de Caixa</CardTitle>
          <CardDescription>Evolução mensal de receitas, despesas e saldo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart data={fluxoCaixaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="receitas" stroke="var(--color-receitas)" name="Receitas (R$)" />
                <Line type="monotone" dataKey="despesas" stroke="var(--color-despesas)" name="Despesas (R$)" />
                <Line type="monotone" dataKey="saldo" stroke="var(--color-saldo)" name="Saldo (R$)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Composição das Receitas</CardTitle>
          <CardDescription>Distribuição por fonte de receita</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={receitasDespesasData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {receitasDespesasData.map((entry, index) => (
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
          <CardTitle>Composição das Despesas</CardTitle>
          <CardDescription>Distribuição por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={despesasCategoriaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {despesasCategoriaData.map((entry, index) => (
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
