"use client"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Tipo para necessidade de material
type NecessidadeMaterial = {
  id: string
  material: string
  codigo: string
  quantidadeNecessaria: number
  quantidadeDisponivel: number
  unidade: string
  dataLimite: string
  status: "ok" | "alerta" | "critico"
}

export function MRPTable() {
  const { estoqueMateriaPrima, ordensProducao, produtos } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  // Dados mockados para necessidades de materiais
  const necessidadesMateriais: NecessidadeMaterial[] = [
    {
      id: "NEC-001",
      material: "Polipropileno H201",
      codigo: "PP-H201",
      quantidadeNecessaria: 2500,
      quantidadeDisponivel: 5000,
      unidade: "KG",
      dataLimite: "20/05/2025",
      status: "ok",
    },
    {
      id: "NEC-002",
      material: "Polietileno HD500",
      codigo: "PE-HD500",
      quantidadeNecessaria: 3000,
      quantidadeDisponivel: 3500,
      unidade: "KG",
      dataLimite: "18/05/2025",
      status: "alerta",
    },
    {
      id: "NEC-003",
      material: "PVC Rígido R100",
      codigo: "PVC-R100",
      quantidadeNecessaria: 1800,
      quantidadeDisponivel: 2800,
      unidade: "KG",
      dataLimite: "25/05/2025",
      status: "ok",
    },
    {
      id: "NEC-004",
      material: "Masterbatch Azul 01",
      codigo: "MB-AZ01",
      quantidadeNecessaria: 450,
      quantidadeDisponivel: 500,
      unidade: "KG",
      dataLimite: "19/05/2025",
      status: "alerta",
    },
    {
      id: "NEC-005",
      material: "Masterbatch Verde 01",
      codigo: "MB-VD01",
      quantidadeNecessaria: 500,
      quantidadeDisponivel: 450,
      unidade: "KG",
      dataLimite: "21/05/2025",
      status: "critico",
    },
    {
      id: "NEC-006",
      material: "Aditivo UV 01",
      codigo: "AD-UV01",
      quantidadeNecessaria: 250,
      quantidadeDisponivel: 300,
      unidade: "KG",
      dataLimite: "22/05/2025",
      status: "alerta",
    },
    {
      id: "NEC-007",
      material: "Caixa de Papelão 01",
      codigo: "EMB-CX01",
      quantidadeNecessaria: 1200,
      quantidadeDisponivel: 1000,
      unidade: "UN",
      dataLimite: "23/05/2025",
      status: "critico",
    },
  ]

  // Filtrar necessidades com base no termo de pesquisa e filtro de status
  const filteredNecessidades = necessidadesMateriais.filter((necessidade) => {
    const matchesSearch =
      necessidade.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      necessidade.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || necessidade.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Contagem de itens por status
  const countByStatus = {
    ok: necessidadesMateriais.filter((item) => item.status === "ok").length,
    alerta: necessidadesMateriais.filter((item) => item.status === "alerta").length,
    critico: necessidadesMateriais.filter((item) => item.status === "critico").length,
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Materiais OK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{countByStatus.ok}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Materiais em Alerta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{countByStatus.alerta}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Materiais Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{countByStatus.critico}</div>
          </CardContent>
        </Card>
      </div>

      {countByStatus.critico > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Existem {countByStatus.critico} materiais em estado crítico que precisam ser comprados imediatamente.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-4">
        <Input
          placeholder="Pesquisar materiais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="ok">OK</SelectItem>
            <SelectItem value="alerta">Alerta</SelectItem>
            <SelectItem value="critico">Crítico</SelectItem>
          </SelectContent>
        </Select>
        <Button>Gerar Requisições</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Necessário</TableHead>
              <TableHead>Disponível</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Data Limite</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNecessidades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhuma necessidade de material encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredNecessidades.map((necessidade) => {
                const saldo = necessidade.quantidadeDisponivel - necessidade.quantidadeNecessaria
                return (
                  <TableRow key={necessidade.id}>
                    <TableCell className="font-medium">{necessidade.codigo}</TableCell>
                    <TableCell>{necessidade.material}</TableCell>
                    <TableCell>
                      {necessidade.quantidadeNecessaria} {necessidade.unidade}
                    </TableCell>
                    <TableCell>
                      {necessidade.quantidadeDisponivel} {necessidade.unidade}
                    </TableCell>
                    <TableCell className={saldo < 0 ? "text-red-600 font-medium" : "text-green-600"}>
                      {saldo} {necessidade.unidade}
                    </TableCell>
                    <TableCell>{necessidade.dataLimite}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          necessidade.status === "ok"
                            ? "success"
                            : necessidade.status === "alerta"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {necessidade.status === "ok" ? "OK" : necessidade.status === "alerta" ? "Alerta" : "Crítico"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
