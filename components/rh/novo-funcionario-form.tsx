"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovoFuncionarioForm({ onSuccess }: { onSuccess: () => void }) {
  const { adicionarFuncionario } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    departamento: "",
    admissao: new Date().toISOString().split("T")[0],
    status: "ativo" as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.cargo || !formData.departamento) {
      toast({
        title: "Erro ao criar funcionário",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    adicionarFuncionario(formData)

    toast({
      title: "Funcionário criado com sucesso",
      description: "O funcionário foi adicionado ao sistema",
    })

    onSuccess()
  }

  const departamentos = [
    "Produção",
    "Administrativo",
    "Comercial",
    "Engenharia",
    "Qualidade",
    "Manutenção",
    "Logística",
    "Financeiro",
    "RH",
    "PCP",
    "Compras",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo">Cargo *</Label>
          <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departamento">Departamento *</Label>
          <Select
            value={formData.departamento}
            onValueChange={(value) => setFormData({ ...formData, departamento: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um departamento" />
            </SelectTrigger>
            <SelectContent>
              {departamentos.map((departamento) => (
                <SelectItem key={departamento} value={departamento}>
                  {departamento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="admissao">Data de Admissão</Label>
          <Input id="admissao" name="admissao" type="date" value={formData.admissao} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="ferias">Férias</SelectItem>
              <SelectItem value="afastado">Afastado</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Funcionário</Button>
      </div>
    </form>
  )
}
