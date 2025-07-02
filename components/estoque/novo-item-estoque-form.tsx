"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function NovoItemEstoqueForm({
  tipo,
  onSuccess,
}: {
  tipo: "materia-prima" | "produto-acabado"
  onSuccess: () => void
}) {
  const { adicionarItemEstoqueMP, adicionarItemEstoquePA } = useData()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    categoria: "",
    quantidade: 0,
    unidade: "",
    localizacao: "",
    lote: "",
    validade: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split("T")[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantidade" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.codigo || !formData.nome || !formData.categoria || formData.quantidade <= 0) {
      toast({
        title: "Erro ao criar item",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    if (tipo === "materia-prima") {
      adicionarItemEstoqueMP(formData)
    } else {
      adicionarItemEstoquePA(formData)
    }

    toast({
      title: "Item criado com sucesso",
      description: "O item foi adicionado ao estoque",
    })

    onSuccess()
  }

  const categoriasMP = ["Resina", "Pigmento", "Aditivo", "Embalagem"]
  const categoriasPA = ["Caixas", "Tampas", "Perfis", "Garrafas", "Potes", "Tubos", "Bandejas"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codigo">Código *</Label>
          <Input id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria *</Label>
          <Select
            value={formData.categoria}
            onValueChange={(value) => setFormData({ ...formData, categoria: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {(tipo === "materia-prima" ? categoriasMP : categoriasPA).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="unidade">Unidade *</Label>
          <Select
            value={formData.unidade}
            onValueChange={(value) => setFormData({ ...formData, unidade: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KG">KG</SelectItem>
              <SelectItem value="UN">UN</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="CX">CX</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantidade">Quantidade *</Label>
          <Input
            id="quantidade"
            name="quantidade"
            type="number"
            min="0"
            step="0.01"
            value={formData.quantidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="localizacao">Localização</Label>
          <Input id="localizacao" name="localizacao" value={formData.localizacao} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lote">Lote</Label>
          <Input id="lote" name="lote" value={formData.lote} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="validade">Validade</Label>
          <Input id="validade" name="validade" type="date" value={formData.validade} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit">Criar Item</Button>
      </div>
    </form>
  )
}
