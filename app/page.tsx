import { SuperDashboard } from "@/components/super-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BellRing, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h1>
          <p className="text-muted-foreground">Visão geral consolidada de todos os departamentos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Atualizado: 15/05/2025 00:27</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Estoque baixo: Resina PP H201</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Manutenção preventiva: Injetora #3</span>
              </div>
              <div className="flex items-center gap-2 text-amber-500">
                <BellRing className="h-4 w-4" />
                <span className="text-sm">Pedido #1234 com prazo próximo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Receita (mês)</span>
                <span className="font-medium">R$ 1.245.000,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Custos (mês)</span>
                <span className="font-medium">R$ 876.500,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Margem</span>
                <span className="font-medium text-emerald-600">29,6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">OEE Global</span>
                <span className="font-medium">78,2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ordens em Produção</span>
                <span className="font-medium">14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Taxa de Refugo</span>
                <span className="font-medium">2,3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard Consolidado</TabsTrigger>
          <TabsTrigger value="kpis">KPIs Estratégicos</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <SuperDashboard />
        </TabsContent>
        <TabsContent value="kpis">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {[
              { title: "Atendimento de Pedidos (OTIF)", value: "94,7%", status: "success" },
              { title: "Giro de Estoque", value: "5,2x", status: "success" },
              { title: "Nível de Inventário", value: "R$ 1.876.450,00", status: "warning" },
              { title: "Custos de Não Qualidade", value: "1,8%", status: "success" },
              { title: "Satisfação do Cliente", value: "4,7/5,0", status: "success" },
              { title: "ROI Novos Projetos", value: "18,5%", status: "success" },
            ].map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    {kpi.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
