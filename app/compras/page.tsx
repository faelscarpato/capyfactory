"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, ShoppingBag, Users, BarChart3 } from "lucide-react"
import { ComprasDashboard } from "@/components/compras/compras-dashboard"
import { ComprasTable } from "@/components/compras/compras-table"
import { FornecedoresTable } from "@/components/compras/fornecedores-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovaCompraForm } from "@/components/compras/nova-compra-form"
import { NovoFornecedorForm } from "@/components/compras/novo-fornecedor-form"

export default function ComprasPage() {
  const { compras, fornecedores } = useData()
  const [isNovaCompraOpen, setIsNovaCompraOpen] = useState(false)
  const [isNovoFornecedorOpen, setIsNovoFornecedorOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
          <p className="text-muted-foreground">Gestão de compras e fornecedores</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovaCompraOpen} onOpenChange={setIsNovaCompraOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nova Compra</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Ordem de Compra</DialogTitle>
              </DialogHeader>
              <NovaCompraForm onSuccess={() => setIsNovaCompraOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compras em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {compras.filter((c) => c.status === "pendente" || c.status === "aprovada").length}
            </div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 876.500,00</div>
            <p className="text-xs text-muted-foreground">+3,2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fornecedores Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fornecedores.filter((f) => f.status === "ativo").length}</div>
            <p className="text-xs text-muted-foreground">+1 em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compras">
        <TabsList>
          <TabsTrigger value="compras" className="gap-1">
            <ShoppingBag className="h-4 w-4" />
            Ordens de Compra
          </TabsTrigger>
          <TabsTrigger value="fornecedores" className="gap-1">
            <Users className="h-4 w-4" />
            Fornecedores
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="compras" className="space-y-4">
          <ComprasTable />
        </TabsContent>
        <TabsContent value="fornecedores" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isNovoFornecedorOpen} onOpenChange={setIsNovoFornecedorOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Novo Fornecedor</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Novo Fornecedor</DialogTitle>
                </DialogHeader>
                <NovoFornecedorForm onSuccess={() => setIsNovoFornecedorOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <FornecedoresTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <ComprasDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
