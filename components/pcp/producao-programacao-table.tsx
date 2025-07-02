"use client"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, FileEdit, Trash2, Play, Pause } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProducaoProgramacaoTable() {
  const { ordensProducao, setOrdensProducao } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  // Filtrar ordens com base no termo de pesquisa e filtro de status
  const filteredOrdens = ordensProducao.filter((ordem) => {
    const matchesSearch =
      ordem.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || ordem.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Função para alterar o status de uma ordem
  const alterarStatus = (
    id: string,
    novoStatus: "planejada" | "liberada" | "em_producao" | "pausada" | "concluida" | "cancelada",
  ) => {
    setOrdensProducao(ordensProducao.map((ordem) => (ordem.id === id ? { ...ordem, status: novoStatus } : ordem)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Pesquisar ordens..."
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
            <SelectItem value="planejada">Planejada</SelectItem>
            <SelectItem value="liberada">Liberada</SelectItem>
            <SelectItem value="em_producao">Em Produção</SelectItem>
            <SelectItem value="pausada">Pausada</SelectItem>
            <SelectItem value="concluida">Concluída</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Máquina</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrdens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Nenhuma ordem de produção encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrdens.map((ordem) => (
                <TableRow key={ordem.id}>
                  <TableCell className="font-medium">{ordem.id}</TableCell>
                  <TableCell>{ordem.produto}</TableCell>
                  <TableCell>{ordem.quantidade}</TableCell>
                  <TableCell>{ordem.maquina}</TableCell>
                  <TableCell>{ordem.inicio}</TableCell>
                  <TableCell>{ordem.fim}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ordem.status === "em_producao"
                          ? "default"
                          : ordem.status === "concluida"
                            ? "success"
                            : ordem.status === "cancelada"
                              ? "destructive"
                              : ordem.status === "pausada"
                                ? "warning"
                                : "outline"
                      }
                    >
                      {ordem.status === "em_producao"
                        ? "Em Produção"
                        : ordem.status === "planejada"
                          ? "Planejada"
                          : ordem.status === "liberada"
                            ? "Liberada"
                            : ordem.status === "pausada"
                              ? "Pausada"
                              : ordem.status === "concluida"
                                ? "Concluída"
                                : "Cancelada"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ordem.prioridade === "alta"
                          ? "destructive"
                          : ordem.prioridade === "media"
                            ? "default"
                            : "outline"
                      }
                    >
                      {ordem.prioridade === "alta" ? "Alta" : ordem.prioridade === "media" ? "Média" : "Baixa"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {ordem.status === "planejada" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "liberada")}
                            className="flex items-center"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            <span>Liberar</span>
                          </DropdownMenuItem>
                        )}
                        {ordem.status === "liberada" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "em_producao")}
                            className="flex items-center"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            <span>Iniciar Produção</span>
                          </DropdownMenuItem>
                        )}
                        {ordem.status === "em_producao" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "pausada")}
                            className="flex items-center"
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            <span>Pausar</span>
                          </DropdownMenuItem>
                        )}
                        {ordem.status === "pausada" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "em_producao")}
                            className="flex items-center"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            <span>Retomar</span>
                          </DropdownMenuItem>
                        )}
                        {(ordem.status === "em_producao" || ordem.status === "pausada") && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "concluida")}
                            className="flex items-center"
                          >
                            <FileEdit className="mr-2 h-4 w-4" />
                            <span>Concluir</span>
                          </DropdownMenuItem>
                        )}
                        {ordem.status !== "cancelada" && ordem.status !== "concluida" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(ordem.id, "cancelada")}
                            className="flex items-center text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Cancelar</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
