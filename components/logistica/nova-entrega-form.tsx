"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovaEntregaForm({ onSuccess }: { onSuccess: () => void }) {
  const { pedidos, transportadoras, adicionarEntrega } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    pedido: "",
    transportadora: "",
    dataEnvio: new Date().toISOString().split("T")[0],
    dataEntrega: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split("T")[0],
    status: "aguardando" as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.pedido || !formData.transportadora) {
      toast({
        title: "Erro ao criar entrega",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarEntrega({
      pedido: formData.pedido,
      transportadora: transportadoras.find((t) => t.id === formData.transportadora)?.nome || formData.transportadora,
      dataEnvio: formData.dataEnvio,
      dataEntrega: formData.dataEntrega,
      status: formData.status,
    })

    toast({
      title: "Entrega criada com sucesso",
      description: "A entrega foi adicionada ao sistema",
    })

    onSuccess()
  }

  // Filtrar apenas pedidos que estão aprovados ou em produção
  const pedidosDisponiveis = pedidos.filter(
    (p) => p.status === "aprovado" || p.status === "produção" || p.status === "expedição",
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pedido">Pedido *</Label>
          <Select
            value={formData.pedido}
            onValueChange={(value) => setFormData({ ...formData, pedido: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um pedido" />
            </SelectTrigger>
            <SelectContent>
              {pedidosDisponiveis.map((pedido) => (
                <SelectItem key={pedido.id} value={pedido.id}>
                  {pedido.id} - {pedido.cliente}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportadora">Transportadora *</Label>
          <Select
            value={formData.transportadora}
            onValueChange={(value) => setFormData({ ...formData, transportadora: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma transportadora" />
            </SelectTrigger>
            <SelectContent>
              {transportadoras
                .filter((t) => t.status === "ativo")
                .map((transportadora) => (
                  <SelectItem key={transportadora.id} value={transportadora.id}>
                    {transportadora.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataEnvio">Data de Envio</Label>
          <Input id="dataEnvio" name="dataEnvio" type="date" value={formData.dataEnvio} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataEntrega">Data de Entrega Prevista</Label>
          <Input id="dataEntrega" name="dataEntrega" type="date" value={formData.dataEntrega} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aguardando">Aguardando</SelectItem>
              <SelectItem value="em_transito">Em Trânsito</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Entrega</Button>
      </div>
    </form>
  )
}
