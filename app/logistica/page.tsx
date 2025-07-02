"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Truck, Users, BarChart3 } from "lucide-react"
import { LogisticaDashboard } from "@/components/logistica/logistica-dashboard"
import { EntregasTable } from "@/components/logistica/entregas-table"
import { TransportadorasTable } from "@/components/logistica/transportadoras-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovaEntregaForm } from "@/components/logistica/nova-entrega-form"
import { NovaTransportadoraForm } from "@/components/logistica/nova-transportadora-form"

export default function LogisticaPage() {
  const { entregas, transportadoras } = useData()
  const [isNovaEntregaOpen, setIsNovaEntregaOpen] = useState(false)
  const [isNovaTransportadoraOpen, setIsNovaTransportadoraOpen] = useState(false)

  const entregasEmTransito = entregas.filter((e) => e.status === "em_transito").length
  const entregasAguardando = entregas.filter((e) => e.status === "aguardando").length
  const transportadorasAtivas = transportadoras.filter((t) => t.status === "ativo").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logística</h1>
          <p className="text-muted-foreground">Gestão de entregas e transportadoras</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovaEntregaOpen} onOpenChange={setIsNovaEntregaOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nova Entrega</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Entrega</DialogTitle>
              </DialogHeader>
              <NovaEntregaForm onSuccess={() => setIsNovaEntregaOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Entregas em Trânsito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entregasEmTransito}</div>
            <p className="text-xs text-muted-foreground">Previsão de entrega em até 2 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Entregas Aguardando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entregasAguardando}</div>
            <p className="text-xs text-muted-foreground">Aguardando coleta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transportadoras Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transportadorasAtivas}</div>
            <p className="text-xs text-muted-foreground">De {transportadoras.length} cadastradas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entregas">
        <TabsList>
          <TabsTrigger value="entregas" className="gap-1">
            <Truck className="h-4 w-4" />
            Entregas
          </TabsTrigger>
          <TabsTrigger value="transportadoras" className="gap-1">
            <Users className="h-4 w-4" />
            Transportadoras
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="entregas" className="space-y-4">
          <EntregasTable />
        </TabsContent>
        <TabsContent value="transportadoras" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isNovaTransportadoraOpen} onOpenChange={setIsNovaTransportadoraOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Nova Transportadora</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Transportadora</DialogTitle>
                </DialogHeader>
                <NovaTransportadoraForm onSuccess={() => setIsNovaTransportadoraOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <TransportadorasTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <LogisticaDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
