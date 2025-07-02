"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const oeeData = [
  { month: "Jan", disponibilidade: 85, performance: 78, qualidade: 96, oee: 63.6 },
  { month: "Fev", disponibilidade: 86, performance: 79, qualidade: 96, oee: 65.1 },
  { month: "Mar", disponibilidade: 88, performance: 81, qualidade: 97, oee: 69.1 },
  { month: "Abr", disponibilidade: 89, performance: 83, qualidade: 97, oee: 71.6 },
  { month: "Mai", disponibilidade: 90, performance: 84, qualidade: 98, oee: 74.1 },
]

const producaoData = [
  { month: "Jan", injetora: 42500, extrusora: 38200, sopradora: 12800 },
  { month: "Fev", injetora: 43800, extrusora: 39100, sopradora: 13200 },
  { month: "Mar", injetora: 45200, extrusora: 40300, sopradora: 13600 },
  { month: "Abr", injetora: 46500, extrusora: 41200, sopradora: 14100 },
  { month: "Mai", injetora: 48200, extrusora: 42500, sopradora: 14500 },
]

const paradasData = [
  { motivo: "Setup", horas: 120 },
  { motivo: "Manutenção Corretiva", horas: 85 },
  { motivo: "Manutenção Preventiva", horas: 65 },
  { motivo: "Falta de Material", horas: 45 },
  { motivo: "Falta de Operador", horas: 30 },
  { motivo: "Ajustes de Qualidade", horas: 25 },
]

const chartConfig = {
  disponibilidade: {
    label: "Disponibilidade",
    color: "hsl(var(--chart-1))",
  },
  performance: {
    label: "Performance",
    color: "hsl(var(--chart-2))",
  },
  qualidade: {
    label: "Qualidade",
    color: "hsl(var(--chart-3))",
  },
  oee: {
    label: "OEE",
    color: "hsl(var(--chart-4))",
  },
  injetora: {
    label: "Injetora",
    color: "hsl(var(--chart-5))",
  },
  extrusora: {
    label: "Extrusora",
    color: "hsl(var(--chart-6))",
  },
  sopradora: {
    label: "Sopradora",
    color: "hsl(var(--chart-7))",
  },
}

export function ProducaoDashboard() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>OEE - Eficiência Global dos Equipamentos</CardTitle>
          <CardDescription>Evolução mensal dos componentes do OEE</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart data={oeeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="disponibilidade"
                  stroke="var(--color-disponibilidade)"
                  name="Disponibilidade (%)"
                />
                <Line type="monotone" dataKey="performance" stroke="var(--color-performance)" name="Performance (%)" />
                <Line type="monotone" dataKey="qualidade" stroke="var(--color-qualidade)" name="Qualidade (%)" />
                <Line type="monotone" dataKey="oee" stroke="var(--color-oee)" name="OEE (%)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produção por Tipo de Máquina</CardTitle>
          <CardDescription>Quantidade produzida por mês</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartContainer config={chartConfig} className="h-full">
              <BarChart data={producaoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="injetora" fill="var(--color-injetora)" name="Injetora (pçs)" />
                <Bar dataKey="extrusora" fill="var(--color-extrusora)" name="Extrusora (kg)" />
                <Bar dataKey="sopradora" fill="var(--color-sopradora)" name="Sopradora (pçs)" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Motivos de Paradas</CardTitle>
          <CardDescription>Horas paradas por motivo (mês atual)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={paradasData} margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="motivo" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" fill="#8884d8" name="Horas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
