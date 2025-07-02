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
import { Eye, FileEdit, MoreVertical, Search, Wrench, AlertTriangle } from "lucide-react"
import { useData } from "@/context/data-context"

const statusMap: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  operacional: { label: "Operacional", variant: "success" },
  manutencao: { label: "Em Manutenção", variant: "warning" },
  inativo: { label: "Inativo", variant: "destructive" },
}

export function EquipamentosTable() {
  const { equipamentos } = useData()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEquipamentos = equipamentos.filter(
    (equipamento) =>
      equipamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamento.fabricante.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar equipamentos..."
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
              <TableHead>Nome</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Fabricante</TableHead>
              <TableHead>Data Aquisição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipamentos.map((equipamento) => (
              <TableRow key={equipamento.id}>
                <TableCell className="font-medium">{equipamento.id}</TableCell>
                <TableCell>{equipamento.nome}</TableCell>
                <TableCell>{equipamento.modelo}</TableCell>
                <TableCell>{equipamento.fabricante}</TableCell>
                <TableCell>{equipamento.dataAquisicao}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[equipamento.status].variant as any}>
                    {statusMap[equipamento.status].label}
                  </Badge>
                </TableCell>
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
                        <Wrench className="h-4 w-4" />
                        <span>Agendar Manutenção</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Reportar Problema</span>
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
