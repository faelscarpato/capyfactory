"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PCPDashboard } from "@/components/pcp/pcp-dashboard"
import { ProducaoPlanejamentoTable } from "@/components/pcp/producao-planejamento-table"
import { ProducaoProgramacaoTable } from "@/components/pcp/producao-programacao-table"
import { MRPTable } from "@/components/pcp/mrp-table"
import { NovoPlanoProducaoForm } from "@/components/pcp/novo-plano-producao-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function PCPPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planejamento e Controle da Produção</h1>
          <p className="text-muted-foreground">Gerencie o planejamento, programação e controle da produção</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Plano de Produção
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Novo Plano de Produção</SheetTitle>
            </SheetHeader>
            <NovoPlanoProducaoForm />
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
          <TabsTrigger value="programacao">Programação</TabsTrigger>
          <TabsTrigger value="mrp">MRP</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <PCPDashboard />
        </TabsContent>
        <TabsContent value="planejamento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planejamento da Produção</CardTitle>
              <CardDescription>Visualize e gerencie os planos de produção para os próximos períodos</CardDescription>
            </CardHeader>
            <CardContent>
              <ProducaoPlanejamentoTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="programacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Programação da Produção</CardTitle>
              <CardDescription>Visualize e gerencie a programação detalhada da produção</CardDescription>
            </CardHeader>
            <CardContent>
              <ProducaoProgramacaoTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mrp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planejamento de Necessidades de Materiais (MRP)</CardTitle>
              <CardDescription>
                Visualize as necessidades de materiais para atender à programação da produção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MRPTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
