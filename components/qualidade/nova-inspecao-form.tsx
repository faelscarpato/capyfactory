"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function NovaInspecaoForm({ onSuccess }: { onSuccess: () => void }) {
  const { estoqueMateriaPrima, estoqueProdutoAcabado, adicionarInspecao } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    tipo: "",
    item: "",
    data: new Date().toISOString().split("T")[0],
    resultado: "pendente" as const,
    responsavel: "",
    observacoes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.tipo || !formData.item || !formData.responsavel) {
      toast({
        title: "Erro ao criar inspeção",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarInspecao(formData)

    toast({
      title: "Inspeção criada com sucesso",
      description: "A inspeção foi adicionada ao sistema",
    })

    onSuccess()
  }

  // Itens disponíveis para inspeção baseados no tipo selecionado
  const getItensDisponiveis = () => {
    if (formData.tipo === "materia_prima") {
      return estoqueMateriaPrima.map((item) => ({
        id: item.id,
        nome: item.nome,
      }))
    } else if (formData.tipo === "produto_acabado") {
      return estoqueProdutoAcabado.map((item) => ({
        id: item.id,
        nome: item.nome,
      }))
    } else if (formData.tipo === "processo") {
      return [
        { id: "proc-1", nome: "Injeção - Caixa Plástica 20L" },
        { id: "proc-2", nome: "Injeção - Tampa Rosqueável 50mm" },
        { id: "proc-3", nome: "Extrusão - Perfil Plástico T20" },
        { id: "proc-4", nome: "Sopro - Garrafa 500ml" },
        { id: "proc-5", nome: "Injeção - Pote 250ml" },
      ]
    }
    return []
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Inspeção *</Label>
          <Select
            value={formData.tipo}
            onValueChange={(value) => setFormData({ ...formData, tipo: value, item: "" })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="materia_prima">Matéria-Prima</SelectItem>
              <SelectItem value="processo">Processo</SelectItem>
              <SelectItem value="produto_acabado">Produto Acabado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item">Item *</Label>
          <Select
            value={formData.item}
            onValueChange={(value) => setFormData({ ...formData, item: value })}
            disabled={!formData.tipo}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o item" />
            </SelectTrigger>
            <SelectContent>
              {getItensDisponiveis().map((item) => (
                <SelectItem key={item.id} value={item.nome}>
                  {item.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsavel">Responsável *</Label>
          <Input id="responsavel" name="responsavel" value={formData.responsavel} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input id="data" name="data" type="date" value={formData.data} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resultado">Resultado</Label>
          <Select
            value={formData.resultado}
            onValueChange={(value) => setFormData({ ...formData, resultado: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o resultado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="reprovado">Reprovado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows={3} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Inspeção</Button>
      </div>
    </form>
  )
}
