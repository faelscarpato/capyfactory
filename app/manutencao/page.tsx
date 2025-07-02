"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Wrench, BarChart3, Settings } from "lucide-react"
import { ManutencaoDashboard } from "@/components/manutencao/manutencao-dashboard"
import { ManutencoesTable } from "@/components/manutencao/manutencoes-table"
import { EquipamentosTable } from "@/components/manutencao/equipamentos-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovaManutencaoForm } from "@/components/manutencao/nova-manutencao-form"
import { NovoEquipamentoForm } from "@/components/manutencao/novo-equipamento-form"

export default function ManutencaoPage() {
  const { manutencoes, equipamentos } = useData()
  const [isNovaManutencaoOpen, setIsNovaManutencaoOpen] = useState(false)
  const [isNovoEquipamentoOpen, setIsNovoEquipamentoOpen] = useState(false)

  const equipamentosOperacionais = equipamentos.filter((e) => e.status === "operacional").length
  const equipamentosManutencao = equipamentos.filter((e) => e.status === "manutencao").length
  const manutencoesPlanejadas = manutencoes.filter((m) => m.status === "planejada").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manutenção</h1>
          <p className="text-muted-foreground">Gestão de manutenções e equipamentos</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovaManutencaoOpen} onOpenChange={setIsNovaManutencaoOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nova Manutenção</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Manutenção</DialogTitle>
              </DialogHeader>
              <NovaManutencaoForm onSuccess={() => setIsNovaManutencaoOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equipamentos Operacionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipamentosOperacionais}</div>
            <p className="text-xs text-muted-foreground">De {equipamentos.length} equipamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equipamentos em Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipamentosManutencao}</div>
            <p className="text-xs text-muted-foreground">De {equipamentos.length} equipamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Manutenções Planejadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{manutencoesPlanejadas}</div>
            <p className="text-xs text-muted-foreground">Para os próximos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manutencoes">
        <TabsList>
          <TabsTrigger value="manutencoes" className="gap-1">
            <Wrench className="h-4 w-4" />
            Manutenções
          </TabsTrigger>
          <TabsTrigger value="equipamentos" className="gap-1">
            <Settings className="h-4 w-4" />
            Equipamentos
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manutencoes" className="space-y-4">
          <ManutencoesTable />
        </TabsContent>
        <TabsContent value="equipamentos" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isNovoEquipamentoOpen} onOpenChange={setIsNovoEquipamentoOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Novo Equipamento</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Novo Equipamento</DialogTitle>
                </DialogHeader>
                <NovoEquipamentoForm onSuccess={() => setIsNovoEquipamentoOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <EquipamentosTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <ManutencaoDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
