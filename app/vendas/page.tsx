"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Users, BarChart3 } from "lucide-react"
import { VendasDashboard } from "@/components/vendas/vendas-dashboard"
import { VendasTable } from "@/components/vendas/vendas-table"
import { ClientesTable } from "@/components/vendas/clientes-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovoPedidoForm } from "@/components/vendas/novo-pedido-form"
import { NovoClienteForm } from "@/components/vendas/novo-cliente-form"

export default function VendasPage() {
  const { pedidos, clientes } = useData()
  const [isNovoPedidoOpen, setIsNovoPedidoOpen] = useState(false)
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground">Gestão comercial e acompanhamento de pedidos</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovoPedidoOpen} onOpenChange={setIsNovoPedidoOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Novo Pedido</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Pedido</DialogTitle>
              </DialogHeader>
              <NovoPedidoForm onSuccess={() => setIsNovoPedidoOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pedidos.filter((p) => p.status !== "entregue" && p.status !== "cancelado").length}
            </div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.245.000,00</div>
            <p className="text-xs text-muted-foreground">+5,5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes.filter((c) => c.status === "ativo").length}</div>
            <p className="text-xs text-muted-foreground">+2 em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pedidos">
        <TabsList>
          <TabsTrigger value="pedidos" className="gap-1">
            <FileText className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="clientes" className="gap-1">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pedidos" className="space-y-4">
          <VendasTable />
        </TabsContent>
        <TabsContent value="clientes" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isNovoClienteOpen} onOpenChange={setIsNovoClienteOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Novo Cliente</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Novo Cliente</DialogTitle>
                </DialogHeader>
                <NovoClienteForm onSuccess={() => setIsNovoClienteOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <ClientesTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <VendasDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
