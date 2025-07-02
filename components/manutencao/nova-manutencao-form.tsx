"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovaManutencaoForm({ onSuccess }: { onSuccess: () => void }) {
  const { equipamentos, adicionarManutencao } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    equipamento: "",
    tipo: "",
    dataInicio: new Date().toISOString().split("T")[0],
    dataFim: new Date().toISOString().split("T")[0],
    status: "planejada" as const,
    responsavel: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.equipamento || !formData.tipo || !formData.responsavel) {
      toast({
        title: "Erro ao criar manutenção",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarManutencao({
      equipamento: equipamentos.find((e) => e.id === formData.equipamento)?.nome || formData.equipamento,
      tipo: formData.tipo as any,
      dataInicio: formData.dataInicio,
      dataFim: formData.dataFim,
      status: formData.status,
      responsavel: formData.responsavel,
    })

    toast({
      title: "Manutenção criada com sucesso",
      description: "A manutenção foi adicionada ao sistema",
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="equipamento">Equipamento *</Label>
          <Select
            value={formData.equipamento}
            onValueChange={(value) => setFormData({ ...formData, equipamento: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um equipamento" />
            </SelectTrigger>
            <SelectContent>
              {equipamentos.map((equipamento) => (
                <SelectItem key={equipamento.id} value={equipamento.id}>
                  {equipamento.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Manutenção *</Label>
          <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preventiva">Preventiva</SelectItem>
              <SelectItem value="corretiva">Corretiva</SelectItem>
              <SelectItem value="preditiva">Preditiva</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data de Início *</Label>
          <Input
            id="dataInicio"
            name="dataInicio"
            type="date"
            value={formData.dataInicio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data de Fim *</Label>
          <Input id="dataFim" name="dataFim" type="date" value={formData.dataFim} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsavel">Responsável *</Label>
          <Input id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planejada">Planejada</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Manutenção</Button>
      </div>
    </form>
  )
}
