"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovoPedidoForm({ onSuccess }: { onSuccess: () => void }) {
  const { clientes, produtos, adicionarPedido } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    cliente: "",
    data: new Date().toISOString().split("T")[0],
    valor: 0,
    status: "pendente" as const,
  })

  const [selectedProdutos, setSelectedProdutos] = useState<Array<{ id: string; quantidade: number }>>([])
  const [produtoAtual, setProdutoAtual] = useState("")
  const [quantidadeAtual, setQuantidadeAtual] = useState(1)

  const handleAddProduto = () => {
    if (!produtoAtual) return

    setSelectedProdutos((prev) => [...prev, { id: produtoAtual, quantidade: quantidadeAtual }])

    // Calcular valor do pedido
    const produto = produtos.find((p) => p.id === produtoAtual)
    if (produto) {
      setFormData((prev) => ({
        ...prev,
        valor: prev.valor + produto.preco * quantidadeAtual,
      }))
    }

    setProdutoAtual("")
    setQuantidadeAtual(1)
  }

  const handleRemoveProduto = (index: number) => {
    const removido = selectedProdutos[index]
    const produto = produtos.find((p) => p.id === removido.id)

    if (produto) {
      setFormData((prev) => ({
        ...prev,
        valor: prev.valor - produto.preco * removido.quantidade,
      }))
    }

    setSelectedProdutos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.cliente || selectedProdutos.length === 0) {
      toast({
        title: "Erro ao criar pedido",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarPedido({
      cliente: clientes.find((c) => c.id === formData.cliente)?.nome || formData.cliente,
      data: new Date().toLocaleDateString("pt-BR"),
      valor: formData.valor,
      status: formData.status,
    })

    toast({
      title: "Pedido criado com sucesso",
      description: "O pedido foi adicionado ao sistema",
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Select value={formData.cliente} onValueChange={(value) => setFormData({ ...formData, cliente: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientes
                .filter((c) => c.status === "ativo")
                .map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Produtos</Label>
          <div className="flex gap-2">
            <Select value={produtoAtual} onValueChange={setProdutoAtual}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {produtos
                  .filter((p) => p.status === "ativo")
                  .map((produto) => (
                    <SelectItem key={produto.id} value={produto.id}>
                      {produto.nome} - R$ {produto.preco.toFixed(2)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="1"
              value={quantidadeAtual}
              onChange={(e) => setQuantidadeAtual(Number.parseInt(e.target.value) || 1)}
              className="w-24"
            />
            <Button type="button" onClick={handleAddProduto} variant="secondary">
              Adicionar
            </Button>
          </div>

          {selectedProdutos.length > 0 && (
            <div className="border rounded-md mt-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProdutos.map((item, index) => {
                    const produto = produtos.find((p) => p.id === item.id)
                    return (
                      <TableRow key={index}>
                        <TableCell>{produto?.nome}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>R$ {produto ? (produto.preco * item.quantidade).toFixed(2) : "0.00"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveProduto(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor">Valor Total</Label>
          <Input id="valor" value={`R$ ${formData.valor.toFixed(2)}`} readOnly />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Pedido</Button>
      </div>
    </form>
  )
}

// Componentes auxiliares para a tabela de produtos
function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full">{children}</table>
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>
}

function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left p-2 text-xs font-medium ${className}`}>{children}</th>
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-2 text-sm">{children}</td>
}

import { X } from "lucide-react"
