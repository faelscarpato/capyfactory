"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Users, BarChart3, FileText } from "lucide-react"
import { RHDashboard } from "@/components/rh/rh-dashboard"
import { FuncionariosTable } from "@/components/rh/funcionarios-table"
import { useData } from "@/context/data-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovoFuncionarioForm } from "@/components/rh/novo-funcionario-form"

export default function RHPage() {
  const { funcionarios } = useData()
  const [isNovoFuncionarioOpen, setIsNovoFuncionarioOpen] = useState(false)

  const funcionariosAtivos = funcionarios.filter((f) => f.status === "ativo").length
  const funcionariosFerias = funcionarios.filter((f) => f.status === "ferias").length
  const funcionariosAfastados = funcionarios.filter((f) => f.status === "afastado").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recursos Humanos</h1>
          <p className="text-muted-foreground">Gestão de funcionários e departamentos</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isNovoFuncionarioOpen} onOpenChange={setIsNovoFuncionarioOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Novo Funcionário</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Funcionário</DialogTitle>
              </DialogHeader>
              <NovoFuncionarioForm onSuccess={() => setIsNovoFuncionarioOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionarios.length}</div>
            <p className="text-xs text-muted-foreground">Em todos os departamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionariosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              {((funcionariosAtivos / funcionarios.length) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funcionários em Férias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionariosFerias}</div>
            <p className="text-xs text-muted-foreground">
              {((funcionariosFerias / funcionarios.length) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Afastados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionariosAfastados}</div>
            <p className="text-xs text-muted-foreground">
              {((funcionariosAfastados / funcionarios.length) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funcionarios">
        <TabsList>
          <TabsTrigger value="funcionarios" className="gap-1">
            <Users className="h-4 w-4" />
            Funcionários
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="documentos" className="gap-1">
            <FileText className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="funcionarios" className="space-y-4">
          <FuncionariosTable />
        </TabsContent>
        <TabsContent value="dashboard">
          <RHDashboard />
        </TabsContent>
        <TabsContent value="documentos">
          <div className="rounded-md border mt-4 p-8 text-center">
            <h3 className="text-lg font-medium">Documentos e Formulários</h3>
            <p className="text-muted-foreground">Documentos e formulários do departamento de RH</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
