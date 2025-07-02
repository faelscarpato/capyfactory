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
import { Eye, FileEdit, MoreVertical, Search, Truck, CheckCircle, Ban } from "lucide-react"
import { useData } from "@/context/data-context"

const statusMap: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  aguardando: { label: "Aguardando", variant: "outline" },
  em_transito: { label: "Em Trânsito", variant: "warning" },
  entregue: { label: "Entregue", variant: "success" },
  cancelada: { label: "Cancelada", variant: "destructive" },
}

export function EntregasTable() {
  const { entregas } = useData()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEntregas = entregas.filter(
    (entrega) =>
      entrega.pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrega.transportadora.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar entregas..."
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
              <TableHead>Pedido</TableHead>
              <TableHead>Transportadora</TableHead>
              <TableHead>Data Envio</TableHead>
              <TableHead>Data Entrega</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntregas.map((entrega) => (
              <TableRow key={entrega.id}>
                <TableCell className="font-medium">{entrega.id}</TableCell>
                <TableCell>{entrega.pedido}</TableCell>
                <TableCell>{entrega.transportadora}</TableCell>
                <TableCell>{entrega.dataEnvio}</TableCell>
                <TableCell>{entrega.dataEntrega}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[entrega.status].variant as any}>{statusMap[entrega.status].label}</Badge>
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
                        <Truck className="h-4 w-4" />
                        <span>Marcar em Trânsito</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Marcar como Entregue</span>
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
