"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, ClipboardCheck, BarChart3, Settings } from "lucide-react"
import { QualidadeDashboard } from "@/components/qualidade/qualidade-dashboard"
import { InspecoesTable } from "@/components/qualidade/inspecoes-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovaInspecaoForm } from "@/components/qualidade/nova-inspecao-form"

export default function QualidadePage() {
  const { qualidadeInspecoes } = useData()
  const [isNovaInspecaoOpen, setIsNovaInspecaoOpen] = useState(false)

  const inspecoesAprovadas = qualidadeInspecoes.filter((i) => i.resultado === "aprovado").length
  const inspecoesReprovadas = qualidadeInspecoes.filter((i) => i.resultado === "reprovado").length
  const taxaAprovacao =
    qualidadeInspecoes.length > 0 ? ((inspecoesAprovadas / qualidadeInspecoes.length) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Qualidade</h1>
          <p className="text-muted-foreground">Gestão da qualidade e inspeções</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovaInspecaoOpen} onOpenChange={setIsNovaInspecaoOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nova Inspeção</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Inspeção de Qualidade</DialogTitle>
              </DialogHeader>
              <NovaInspecaoForm onSuccess={() => setIsNovaInspecaoOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxaAprovacao}%</div>
            <p className="text-xs text-muted-foreground">+1,2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inspeções Realizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualidadeInspecoes.length}</div>
            <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
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
      </div>

      <Tabs defaultValue="inspecoes">
        <TabsList>
          <TabsTrigger value="inspecoes" className="gap-1">
            <ClipboardCheck className="h-4 w-4" />
            Inspeções
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
        <TabsContent value="inspecoes" className="space-y-4">
          <InspecoesTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <QualidadeDashboard />
        </TabsContent>
        <TabsContent value="configuracoes">
          <div className="rounded-md border mt-4 p-8 text-center">
            <h3 className="text-lg font-medium">Configurações de Qualidade</h3>
            <p className="text-muted-foreground">Parâmetros e configurações do módulo de qualidade</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
