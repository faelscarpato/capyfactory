"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovaContaPagarForm({ onSuccess }: { onSuccess: () => void }) {
  const { fornecedores, adicionarContaPagar } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fornecedor: "",
    documento: "",
    emissao: new Date().toISOString().split("T")[0],
    vencimento: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0],
    valor: 0,
    status: "aberto" as const,
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

    if (!formData.fornecedor || !formData.documento || formData.valor <= 0) {
      toast({
        title: "Erro ao criar conta a pagar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarContaPagar({
      fornecedor: fornecedores.find((f) => f.id === formData.fornecedor)?.nome || formData.fornecedor,
      documento: formData.documento,
      emissao: formData.emissao,
      vencimento: formData.vencimento,
      valor: formData.valor,
      status: formData.status,
    })

    toast({
      title: "Conta a pagar criada com sucesso",
      description: "A conta a pagar foi adicionada ao sistema",
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fornecedor">Fornecedor *</Label>
          <Select
            value={formData.fornecedor}
            onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}
            required
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
          <Label htmlFor="documento">Documento *</Label>
          <Input id="documento" name="documento" value={formData.documento} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emissao">Data de Emissão</Label>
          <Input id="emissao" name="emissao" type="date" value={formData.emissao} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vencimento">Data de Vencimento *</Label>
          <Input
            id="vencimento"
            name="vencimento"
            type="date"
            value={formData.vencimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor">Valor (R$) *</Label>
          <Input
            id="valor"
            name="valor"
            type="number"
            min="0"
            step="0.01"
            value={formData.valor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Conta a Pagar</Button>
      </div>
    </form>
  )
}
