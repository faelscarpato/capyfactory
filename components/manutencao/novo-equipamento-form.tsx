"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovoEquipamentoForm({ onSuccess }: { onSuccess: () => void }) {
  const { adicionarEquipamento } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nome: "",
    modelo: "",
    fabricante: "",
    dataAquisicao: new Date().toISOString().split("T")[0],
    status: "operacional" as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.modelo || !formData.fabricante) {
      toast({
        title: "Erro ao criar equipamento",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarEquipamento(formData)

    toast({
      title: "Equipamento criado com sucesso",
      description: "O equipamento foi adicionado ao sistema",
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo *</Label>
          <Input id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fabricante">Fabricante *</Label>
          <Input id="fabricante" name="fabricante" value={formData.fabricante} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
          <Input
            id="dataAquisicao"
            name="dataAquisicao"
            type="date"
            value={formData.dataAquisicao}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operacional">Operacional</SelectItem>
              <SelectItem value="manutencao">Em Manutenção</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Equipamento</Button>
      </div>
    </form>
  )
}
