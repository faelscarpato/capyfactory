"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowDownUp, BarChart3, DollarSign } from "lucide-react"
import { FinanceiroDashboard } from "@/components/financeiro/financeiro-dashboard"
import { ContasReceberTable } from "@/components/financeiro/contas-receber-table"
import { ContasPagarTable } from "@/components/financeiro/contas-pagar-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovaContaReceberForm } from "@/components/financeiro/nova-conta-receber-form"
import { NovaContaPagarForm } from "@/components/financeiro/nova-conta-pagar-form"

export default function FinanceiroPage() {
  const { contasReceber, contasPagar } = useData()
  const [isNovaContaReceberOpen, setIsNovaContaReceberOpen] = useState(false)
  const [isNovaContaPagarOpen, setIsNovaContaPagarOpen] = useState(false)

  // Cálculos financeiros
  const totalContasReceber = contasReceber
    .filter((c) => c.status === "aberto" || c.status === "atrasado")
    .reduce((acc, conta) => acc + conta.valor, 0)

  const totalContasPagar = contasPagar
    .filter((c) => c.status === "aberto" || c.status === "atrasado")
    .reduce((acc, conta) => acc + conta.valor, 0)

  const saldoProjetado = totalContasReceber - totalContasPagar

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">Gestão financeira e fluxo de caixa</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovaContaReceberOpen} onOpenChange={setIsNovaContaReceberOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Nova Conta a Receber</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Conta a Receber</DialogTitle>
              </DialogHeader>
              <NovaContaReceberForm onSuccess={() => setIsNovaContaReceberOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">R$ {totalContasReceber.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {contasReceber.filter((c) => c.status === "aberto" || c.status === "atrasado").length} contas em aberto
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contas a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">R$ {totalContasPagar.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {contasPagar.filter((c) => c.status === "aberto" || c.status === "atrasado").length} contas em aberto
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Projetado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoProjetado >= 0 ? "text-emerald-600" : "text-destructive"}`}>
              R$ {saldoProjetado.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contas-receber">
        <TabsList>
          <TabsTrigger value="contas-receber" className="gap-1">
            <ArrowDownUp className="h-4 w-4" />
            Contas a Receber
          </TabsTrigger>
          <TabsTrigger value="contas-pagar" className="gap-1">
            <DollarSign className="h-4 w-4" />
            Contas a Pagar
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contas-receber" className="space-y-4">
          <ContasReceberTable />
        </TabsContent>
        <TabsContent value="contas-pagar" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={isNovaContaPagarOpen} onOpenChange={setIsNovaContaPagarOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Nova Conta a Pagar</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Nova Conta a Pagar</DialogTitle>
                </DialogHeader>
                <NovaContaPagarForm onSuccess={() => setIsNovaContaPagarOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          <ContasPagarTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <FinanceiroDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
