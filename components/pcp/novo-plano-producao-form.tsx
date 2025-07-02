"use client"

import { useState, useEffect } from "react"
import { useData } from "@/context/data-context"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"

// Schema de validação
const formSchema = z.object({
  produto: z.string().min(1, { message: "Produto é obrigatório" }),
  periodo: z.string().min(1, { message: "Período é obrigatório" }),
  quantidade: z.coerce.number().min(1, { message: "Quantidade deve ser maior que zero" }),
  prioridade: z.enum(["baixa", "media", "alta"], {
    required_error: "Prioridade é obrigatória",
  }),
  status: z.enum(["ativo", "concluido", "cancelado"], {
    required_error: "Status é obrigatório",
  }),
  observacoes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface NovoPlanoProducaoFormProps {
  planoId?: string
  onSuccess?: () => void
}

export function NovoPlanoProducaoForm({ planoId, onSuccess }: NovoPlanoProducaoFormProps) {
  const { produtos, planosProducao, adicionarPlanoProducao, setPlanosProducao } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Configurar o formulário
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produto: "",
      periodo: "",
      quantidade: 0,
      prioridade: "media",
      status: "ativo",
      observacoes: "",
    },
  })

  // Carregar dados do plano se estiver editando
  useEffect(() => {
    if (planoId) {
      const plano = planosProducao.find((p) => p.id === planoId)
      if (plano) {
        form.reset({
          produto: plano.produto,
          periodo: plano.periodo,
          quantidade: plano.quantidade,
          prioridade: plano.prioridade,
          status: plano.status,
          observacoes: plano.observacoes || "",
        })
      }
    }
  }, [planoId, planosProducao, form])

  // Função para lidar com o envio do formulário
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true)

    try {
      if (planoId) {
        // Atualizar plano existente
        setPlanosProducao(
          planosProducao.map((plano) =>
            plano.id === planoId
              ? {
                  ...plano,
                  produto: data.produto,
                  periodo: data.periodo,
                  quantidade: data.quantidade,
                  prioridade: data.prioridade,
                  status: data.status,
                  observacoes: data.observacoes,
                }
              : plano,
          ),
        )
        toast({
          title: "Plano atualizado",
          description: "O plano de produção foi atualizado com sucesso.",
        })
      } else {
        // Adicionar novo plano
        adicionarPlanoProducao({
          produto: data.produto,
          periodo: data.periodo,
          quantidade: data.quantidade,
          prioridade: data.prioridade,
          status: data.status,
          observacoes: data.observacoes,
        })
        toast({
          title: "Plano criado",
          description: "O novo plano de produção foi criado com sucesso.",
        })
      }

      // Resetar o formulário
      form.reset({
        produto: "",
        periodo: "",
        quantidade: 0,
        prioridade: "media",
        status: "ativo",
        observacoes: "",
      })

      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o plano de produção.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="produto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {produtos.map((produto) => (
                    <SelectItem key={produto.id} value={produto.nome}>
                      {produto.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="periodo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Maio/2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prioridade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Input placeholder="Observações (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : planoId ? "Atualizar Plano" : "Criar Plano"}
        </Button>
      </form>
    </Form>
  )
}
