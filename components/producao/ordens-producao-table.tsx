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
import { Eye, FileEdit, MoreVertical, Search, Play, Pause, CheckCircle, AlertTriangle } from "lucide-react"

type StatusType = "planejada" | "liberada" | "em_producao" | "pausada" | "concluida" | "cancelada"
type PrioridadeType = "baixa" | "media" | "alta"

type OrdemProducao = {
  id: string
  produto: string
  quantidade: number
  maquina: string
  inicio: string
  fim: string
  status: StatusType
  prioridade: PrioridadeType
}

const statusMap: Record<
  StatusType,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  planejada: { label: "Planejada", variant: "outline" },
  liberada: { label: "Liberada", variant: "secondary" },
  em_producao: { label: "Em Produção", variant: "default" },
  pausada: { label: "Pausada", variant: "warning" },
  concluida: { label: "Concluída", variant: "success" },
  cancelada: { label: "Cancelada", variant: "destructive" },
}

const prioridadeMap: Record<
  PrioridadeType,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  baixa: { label: "Baixa", variant: "outline" },
  media: { label: "Média", variant: "secondary" },
  alta: { label: "Alta", variant: "destructive" },
}

const ordensMock: OrdemProducao[] = [
  {
    id: "OP-2345",
    produto: "Caixa Plástica 20L",
    quantidade: 5000,
    maquina: "Injetora 01",
    inicio: "15/05/2025",
    fim: "16/05/2025",
    status: "em_producao",
    prioridade: "alta",
  },
  {
    id: "OP-2346",
    produto: "Tampa Rosqueável 50mm",
    quantidade: 10000,
    maquina: "Injetora 02",
    inicio: "15/05/2025",
    fim: "15/05/2025",
    status: "em_producao",
    prioridade: "media",
  },
  {
    id: "OP-2347",
    produto: "Perfil Plástico T20",
    quantidade: 2000,
    maquina: "Extrusora 01",
    inicio: "15/05/2025",
    fim: "17/05/2025",
    status: "em_producao",
    prioridade: "media",
  },
  {
    id: "OP-2348",
    produto: "Garrafa 500ml",
    quantidade: 8000,
    maquina: "Sopradora 01",
    inicio: "16/05/2025",
    fim: "18/05/2025",
    status: "liberada",
    prioridade: "alta",
  },
  {
    id: "OP-2349",
    produto: "Pote 250ml",
    quantidade: 12000,
    maquina: "Injetora 03",
    inicio: "16/05/2025",
    fim: "17/05/2025",
    status: "liberada",
    prioridade: "media",
  },
  {
    id: "OP-2350",
    produto: "Tubo 100mm",
    quantidade: 1500,
    maquina: "Extrusora 02",
    inicio: "17/05/2025",
    fim: "19/05/2025",
    status: "planejada",
    prioridade: "baixa",
  },
  {
    id: "OP-2351",
    produto: "Bandeja Multiuso",
    quantidade: 3000,
    maquina: "Injetora 04",
    inicio: "17/05/2025",
    fim: "18/05/2025",
    status: "planejada",
    prioridade: "media",
  },
  {
    id: "OP-2342",
    produto: "Caixa Plástica 10L",
    quantidade: 4000,
    maquina: "Injetora 01",
    inicio: "12/05/2025",
    fim: "14/05/2025",
    status: "concluida",
    prioridade: "alta",
  },
  {
    id: "OP-2343",
    produto: "Tampa Rosqueável 30mm",
    quantidade: 15000,
    maquina: "Injetora 02",
    inicio: "13/05/2025",
    fim: "14/05/2025",
    status: "concluida",
    prioridade: "media",
  },
  {
    id: "OP-2344",
    produto: "Perfil Plástico T15",
    quantidade: 1800,
    maquina: "Extrusora 01",
    inicio: "13/05/2025",
    fim: "15/05/2025",
    status: "pausada",
    prioridade: "media",
  },
]

export function OrdensProducaoTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrdens = ordensMock.filter(
    (ordem) =>
      ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.maquina.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar ordens de produção..."
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
              <TableHead>OP</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Qtde</TableHead>
              <TableHead>Máquina</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Fim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrdens.map((ordem) => (
              <TableRow key={ordem.id}>
                <TableCell className="font-medium">{ordem.id}</TableCell>
                <TableCell>{ordem.produto}</TableCell>
                <TableCell>{ordem.quantidade.toLocaleString()}</TableCell>
                <TableCell>{ordem.maquina}</TableCell>
                <TableCell>{ordem.inicio}</TableCell>
                <TableCell>{ordem.fim}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[ordem.status].variant as any}>{statusMap[ordem.status].label}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={prioridadeMap[ordem.prioridade].variant as any}>
                    {prioridadeMap[ordem.prioridade].label}
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
                        <Play className="h-4 w-4" />
                        <span>Iniciar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Pause className="h-4 w-4" />
                        <span>Pausar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Concluir</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive gap-2">
                        <AlertTriangle className="h-4 w-4" />
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
