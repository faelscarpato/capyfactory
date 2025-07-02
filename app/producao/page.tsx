import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, ClipboardList, BarChart3, Settings } from "lucide-react"
import { ProducaoDashboard } from "@/components/producao/producao-dashboard"
import { OrdensProducaoTable } from "@/components/producao/ordens-producao-table"

export default function ProducaoPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produção</h1>
          <p className="text-muted-foreground">Acompanhamento e controle da produção</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Nova Ordem</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OEE Global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78,2%</div>
            <p className="text-xs text-muted-foreground">+1,5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ordens em Produção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">3 com prioridade alta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Refugo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,3%</div>
            <p className="text-xs text-muted-foreground">-0,2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92,4%</div>
            <p className="text-xs text-muted-foreground">+0,8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ordens">
        <TabsList>
          <TabsTrigger value="ordens" className="gap-1">
            <ClipboardList className="h-4 w-4" />
            Ordens de Produção
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="gap-1">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ordens" className="space-y-4">
          <OrdensProducaoTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <ProducaoDashboard />
        </TabsContent>
        <TabsContent value="configuracoes">
          <div className="rounded-md border mt-4 p-8 text-center">
            <h3 className="text-lg font-medium">Configurações de Produção</h3>
            <p className="text-muted-foreground">Parâmetros e configurações do módulo de produção</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
