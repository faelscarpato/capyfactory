"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Package, Box, BarChart3 } from "lucide-react"
import { EstoqueDashboard } from "@/components/estoque/estoque-dashboard"
import { MateriaPrimaTable } from "@/components/estoque/materia-prima-table"
import { ProdutoAcabadoTable } from "@/components/estoque/produto-acabado-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { NovoItemEstoqueForm } from "@/components/estoque/novo-item-estoque-form"

export default function EstoquePage() {
  const { estoqueMateriaPrima, estoqueProdutoAcabado } = useData()
  const [isNovoItemOpen, setIsNovoItemOpen] = useState(false)
  const [tipoItem, setTipoItem] = useState<"materia-prima" | "produto-acabado">("materia-prima")

  const handleNovoItem = (tipo: "materia-prima" | "produto-acabado") => {
    setTipoItem(tipo)
    setIsNovoItemOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground">Gestão de estoque de matéria-prima e produto acabado</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovoItemOpen} onOpenChange={setIsNovoItemOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {tipoItem === "materia-prima" ? "Nova Matéria-Prima" : "Novo Produto Acabado"}
                </DialogTitle>
              </DialogHeader>
              <NovoItemEstoqueForm tipo={tipoItem} onSuccess={() => setIsNovoItemOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Matéria-Prima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 850.000,00</div>
            <p className="text-xs text-muted-foreground">{estoqueMateriaPrima.length} itens em estoque</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Produto Acabado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 720.000,00</div>
            <p className="text-xs text-muted-foreground">{estoqueProdutoAcabado.length} itens em estoque</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Giro de Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,2x</div>
            <p className="text-xs text-muted-foreground">+0,3x em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="materia-prima">
        <TabsList>
          <TabsTrigger value="materia-prima" className="gap-1">
            <Package className="h-4 w-4" />
            Matéria-Prima
          </TabsTrigger>
          <TabsTrigger value="produto-acabado" className="gap-1">
            <Box className="h-4 w-4" />
            Produto Acabado
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="materia-prima" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="h-8 gap-1" onClick={() => handleNovoItem("materia-prima")}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Nova Matéria-Prima</span>
            </Button>
          </div>
          <MateriaPrimaTable />
        </TabsContent>
        <TabsContent value="produto-acabado" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="h-8 gap-1" onClick={() => handleNovoItem("produto-acabado")}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Novo Produto Acabado</span>
            </Button>
          </div>
          <ProdutoAcabadoTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <EstoqueDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
