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

const manutencoesTipoData = [
  { name: "Preventiva", value: 25 },
  { name: "Corretiva", value: 15 },
  { name: "Preditiva", value: 10 },
]

const manutencoesStatusData = [
  { name: "Planejada", value: 20 },
  { name: "Em Andamento", value: 15 },
  { name: "Concluída", value: 12 },
  { name: "Cancelada", value: 3 },
]

const tempoParadaData = [
  { equipamento: "Injetora 01", horas: 12 },
  { equipamento: "Injetora 02", horas: 8 },
  { equipamento: "Extrusora 01", horas: 15 },
  { equipamento: "Sopradora 01", horas: 5 },
  { equipamento: "Injetora 03", horas: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const chartConfig = {
  horas: {
    label: "Horas",
    color: "hsl(var(--chart-1))",
  },
}

export function ManutencaoDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Manutenções por Tipo</CardTitle>
          <CardDescription>Distribuição por tipo de manutenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={manutencoesTipoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {manutencoesTipoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} manutenções`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manutenções por Status</CardTitle>
          <CardDescription>Distribuição por status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={manutencoesStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {manutencoesStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} manutenções`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Tempo de Parada por Equipamento</CardTitle>
          <CardDescription>Horas de parada no mês atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <BarChart data={tempoParadaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="equipamento" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="horas" fill="var(--color-horas)" name="Horas de Parada" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
