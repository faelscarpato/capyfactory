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
import { Eye, FileEdit, MoreVertical, Search, CheckCircle, X, AlertTriangle } from "lucide-react"
import { useData } from "@/context/data-context"

const tipoMap: Record<string, string> = {
  materia_prima: "Matéria-Prima",
  processo: "Processo",
  produto_acabado: "Produto Acabado",
}

const resultadoMap: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  aprovado: { label: "Aprovado", variant: "success" },
  reprovado: { label: "Reprovado", variant: "destructive" },
  pendente: { label: "Pendente", variant: "warning" },
}

export function InspecoesTable() {
  const { qualidadeInspecoes } = useData()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInspecoes = qualidadeInspecoes.filter(
    (inspecao) =>
      inspecao.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspecao.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tipoMap[inspecao.tipo].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar inspeções..."
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
              <TableHead>Tipo</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInspecoes.map((inspecao) => (
              <TableRow key={inspecao.id}>
                <TableCell className="font-medium">{inspecao.id}</TableCell>
                <TableCell>{tipoMap[inspecao.tipo]}</TableCell>
                <TableCell>{inspecao.item}</TableCell>
                <TableCell>{inspecao.data}</TableCell>
                <TableCell>
                  <Badge variant={resultadoMap[inspecao.resultado].variant as any}>
                    {resultadoMap[inspecao.resultado].label}
                  </Badge>
                </TableCell>
                <TableCell>{inspecao.responsavel}</TableCell>
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Aprovar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <X className="h-4 w-4" />
                        <span>Reprovar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Pendente</span>
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
