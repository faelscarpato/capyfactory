"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, FileEdit, MoreVertical, Search, Play, CheckCircle, Ban } from "lucide-react"
import { useData } from "@/context/data-context"

const tipoMap: Record<string, string> = {
  preventiva: "Preventiva",
  corretiva: "Corretiva",
  preditiva: "Preditiva",
}

const statusMap: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  planejada: { label: "Planejada", variant: "outline" },
  em_andamento: { label: "Em Andamento", variant: "warning" },
  concluida: { label: "Concluída", variant: "success" },
  cancelada: { label: "Cancelada", variant: "destructive" },
}

export function ManutencoesTable() {
  const { manutencoes } = useData()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredManutencoes = manutencoes.filter(
    (manutencao) =>
      manutencao.equipamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manutencao.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tipoMap[manutencao.tipo].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar manutenções..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManutencoes.map((manutencao) => (
              <TableRow key={manutencao.id}>
                <TableCell className="font-medium">{manutencao.id}</TableCell>
                <TableCell>{manutencao.equipamento}</TableCell>
                <TableCell>{tipoMap[manutencao.tipo]}</TableCell>
                <TableCell>{manutencao.dataInicio}</TableCell>
                <TableCell>{manutencao.dataFim}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[manutencao.status].variant as any}>
                    {statusMap[manutencao.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{manutencao.responsavel}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileEdit className="h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Play className="h-4 w-4" />
                        <span>Iniciar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Concluir</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive gap-2">
                        <Ban className="h-4 w-4" />
                        <span>Cancelar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
