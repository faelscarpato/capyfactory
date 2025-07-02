"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovaCompraForm({ onSuccess }: { onSuccess: () => void }) {
  const { fornecedores, adicionarCompra } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fornecedor: "",
    data: new Date().toISOString().split("T")[0],
    valor: 0,
    status: "pendente" as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "valor" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fornecedor || formData.valor <= 0) {
      toast({
        title: "Erro ao criar ordem de compra",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarCompra({
      fornecedor: fornecedores.find((f) => f.id === formData.fornecedor)?.nome || formData.fornecedor,
      data: new Date().toLocaleDateString("pt-BR"),
      valor: formData.valor,
      status: formData.status,
    })

    toast({
      title: "Ordem de compra criada com sucesso",
      description: "A ordem de compra foi adicionada ao sistema",
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fornecedor">Fornecedor</Label>
          <Select
            value={formData.fornecedor}
            onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um fornecedor" />
            </SelectTrigger>
            <SelectContent>
              {fornecedores
                .filter((f) => f.status === "ativo")
                .map((fornecedor) => (
                  <SelectItem key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor">Valor Total (R$)</Label>
          <Input
            id="valor"
            name="valor"
            type="number"
            min="0"
            step="0.01"
            value={formData.valor}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input id="data" name="data" type="date" value={formData.data} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Ordem de Compra</Button>
      </div>
    </form>
  )
}
