"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/context/data-context"
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
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function PCPDashboard() {
  const { ordensProducao, produtos, estoqueMateriaPrima, planosProducao } = useData()

  // Calcular métricas
  const totalPlanosAtivos = planosProducao.filter((plano) => plano.status === "ativo").length
  const totalOrdensEmProducao = ordensProducao.filter((ordem) => ordem.status === "em_producao").length
  const totalOrdensPlanejadas = ordensProducao.filter((ordem) => ordem.status === "planejada").length
  const totalOrdensConcluidas = ordensProducao.filter((ordem) => ordem.status === "concluida").length

  // Calcular eficiência da produção (ordens concluídas / total de ordens)
  const totalOrdens = ordensProducao.length
  const eficienciaProducao = totalOrdens > 0 ? Math.round((totalOrdensConcluidas / totalOrdens) * 100) : 0

  // Dados para o gráfico de status das ordens
  const statusOrdens = [
    { name: "Em Produção", value: totalOrdensEmProducao },
    { name: "Planejadas", value: totalOrdensPlanejadas },
    { name: "Concluídas", value: totalOrdensConcluidas },
    { name: "Pausadas", value: ordensProducao.filter((ordem) => ordem.status === "pausada").length },
    { name: "Canceladas", value: ordensProducao.filter((ordem) => ordem.status === "cancelada").length },
  ]

  // Dados para o gráfico de utilização de máquinas
  const utilizacaoMaquinas = [
    { name: "Injetora 01", utilizada: 85, disponivel: 15 },
    { name: "Injetora 02", utilizada: 70, disponivel: 30 },
    { name: "Injetora 03", utilizada: 90, disponivel: 10 },
    { name: "Injetora 04", utilizada: 60, disponivel: 40 },
    { name: "Extrusora 01", utilizada: 75, disponivel: 25 },
    { name: "Extrusora 02", utilizada: 65, disponivel: 35 },
    { name: "Sopradora 01", utilizada: 80, disponivel: 20 },
  ]

  // Dados para o gráfico de tendência de produção
  const tendenciaProducao = [
    { name: "Semana 1", planejado: 1200, realizado: 1150 },
    { name: "Semana 2", planejado: 1300, realizado: 1250 },
    { name: "Semana 3", planejado: 1400, realizado: 1380 },
    { name: "Semana 4", planejado: 1500, realizado: 1420 },
    { name: "Semana 5", planejado: 1600, realizado: 1550 },
    { name: "Semana 6", planejado: 1700, realizado: 1650 },
  ]

  // Cores para o gráfico de pizza
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Planos de Produção Ativos</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPlanosAtivos}</div>
          <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ordens em Produção</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrdensEmProducao}</div>
          <p className="text-xs text-muted-foreground">{totalOrdensPlanejadas} ordens planejadas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Eficiência da Produção</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{eficienciaProducao}%</div>
          <Progress value={eficienciaProducao} className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Materiais Críticos</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Materiais abaixo do estoque mínimo</p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Status das Ordens de Produção</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusOrdens}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusOrdens.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Utilização de Máquinas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizacaoMaquinas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="utilizada" stackId="a" fill="#8884d8" name="Utilizada (%)" />
              <Bar dataKey="disponivel" stackId="a" fill="#82ca9d" name="Disponível (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tendência de Produção</CardTitle>
          <CardDescription>Comparação entre produção planejada e realizada</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tendenciaProducao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="planejado" stroke="#8884d8" activeDot={{ r: 8 }} name="Planejado" />
              <Line type="monotone" dataKey="realizado" stroke="#82ca9d" name="Realizado" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Próximas Ordens de Produção</CardTitle>
          <CardDescription>Ordens planejadas para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ordensProducao
              .filter((ordem) => ordem.status === "planejada" || ordem.status === "liberada")
              .slice(0, 5)
              .map((ordem) => (
                <div key={ordem.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">{ordem.produto}</div>
                    <div className="text-sm text-muted-foreground">
                      Quantidade: {ordem.quantidade} | Máquina: {ordem.maquina}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{ordem.inicio}</div>
                    <Badge
                      variant={
                        ordem.prioridade === "alta"
                          ? "destructive"
                          : ordem.prioridade === "media"
                            ? "default"
                            : "outline"
                      }
                    >
                      {ordem.prioridade === "alta" ? "Alta" : ordem.prioridade === "media" ? "Média" : "Baixa"}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
