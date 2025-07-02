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
import { Eye, FileEdit, MoreVertical, Search, CheckCircle, Ban, Package } from "lucide-react"
import { useData } from "@/context/data-context"

const statusMap: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  pendente: { label: "Pendente", variant: "outline" },
  aprovada: { label: "Aprovada", variant: "secondary" },
  recebida: { label: "Recebida", variant: "success" },
  cancelada: { label: "Cancelada", variant: "destructive" },
}

export function ComprasTable() {
  const { compras } = useData()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompras = compras.filter(
    (compra) =>
      compra.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar ordens de compra..."
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
              <TableHead>OC</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompras.map((compra) => (
              <TableRow key={compra.id}>
                <TableCell className="font-medium">{compra.id}</TableCell>
                <TableCell>{compra.fornecedor}</TableCell>
                <TableCell>{compra.data}</TableCell>
                <TableCell>R$ {compra.valor.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[compra.status].variant as any}>{statusMap[compra.status].label}</Badge>
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
                        <CheckCircle className="h-4 w-4" />
                        <span>Aprovar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Package className="h-4 w-4" />
                        <span>Receber</span>
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
