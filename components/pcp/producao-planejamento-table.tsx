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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NovoPlanoProducaoForm } from "./novo-plano-producao-form"

export function ProducaoPlanejamentoTable() {
  const { planosProducao, setPlanosProducao } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingPlano, setEditingPlano] = useState<string | null>(null)

  // Filtrar planos com base no termo de pesquisa
  const filteredPlanos = planosProducao.filter(
    (plano) =>
      plano.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plano.periodo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plano.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para alterar o status de um plano
  const alterarStatus = (id: string, novoStatus: "ativo" | "concluido" | "cancelado") => {
    setPlanosProducao(planosProducao.map((plano) => (plano.id === id ? { ...plano, status: novoStatus } : plano)))
  }

  // Função para excluir um plano
  const excluirPlano = (id: string) => {
    setPlanosProducao(planosProducao.filter((plano) => plano.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Pesquisar planos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Plano</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Plano de Produção</DialogTitle>
            </DialogHeader>
            <NovoPlanoProducaoForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlanos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum plano de produção encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredPlanos.map((plano) => (
                <TableRow key={plano.id}>
                  <TableCell className="font-medium">{plano.id}</TableCell>
                  <TableCell>{plano.produto}</TableCell>
                  <TableCell>{plano.periodo}</TableCell>
                  <TableCell>{plano.quantidade}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        plano.status === "ativo" ? "default" : plano.status === "concluido" ? "success" : "destructive"
                      }
                    >
                      {plano.status === "ativo" ? "Ativo" : plano.status === "concluido" ? "Concluído" : "Cancelado"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        plano.prioridade === "alta"
                          ? "destructive"
                          : plano.prioridade === "media"
                            ? "default"
                            : "outline"
                      }
                    >
                      {plano.prioridade === "alta" ? "Alta" : plano.prioridade === "media" ? "Média" : "Baixa"}
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
                        <DropdownMenuItem onClick={() => setEditingPlano(plano.id)} className="flex items-center">
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        {plano.status !== "ativo" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(plano.id, "ativo")}
                            className="flex items-center"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            <span>Ativar</span>
                          </DropdownMenuItem>
                        )}
                        {plano.status === "ativo" && (
                          <DropdownMenuItem
                            onClick={() => alterarStatus(plano.id, "concluido")}
                            className="flex items-center"
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            <span>Concluir</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => alterarStatus(plano.id, "cancelado")}
                          className="flex items-center text-destructive"
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          <span>Cancelar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => excluirPlano(plano.id)}
                          className="flex items-center text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog para edição de plano */}
      <Dialog
        open={editingPlano !== null}
        onOpenChange={(open) => {
          if (!open) setEditingPlano(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Plano de Produção</DialogTitle>
          </DialogHeader>
          <NovoPlanoProducaoForm planoId={editingPlano || ""} onSuccess={() => setEditingPlano(null)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
