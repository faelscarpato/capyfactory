"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import {
  pedidosMock,
  clientesMock,
  produtosMock,
  ordensMock,
  fornecedoresMock,
  comprasMock,
  estoqueMateriaPrimaMock,
  estoqueProdutoAcabadoMock,
  manutencoesMock,
  equipamentosMock,
  qualidadeInspecoesMock,
  funcionariosMock,
  contasReceberMock,
  contasPagarMock,
  transportadorasMock,
  entregasMock,
} from "@/data/mock-data"

// Tipos
export type Pedido = {
  id: string
  cliente: string
  data: string
  valor: number
  status: "pendente" | "aprovado" | "produção" | "expedição" | "entregue" | "cancelado"
}

export type Cliente = {
  id: string
  nome: string
  cnpj: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  status: "ativo" | "inativo"
}

export type Produto = {
  id: string
  nome: string
  codigo: string
  categoria: string
  unidade: string
  preco: number
  estoque: number
  status: "ativo" | "inativo"
}

export type OrdemProducao = {
  id: string
  produto: string
  quantidade: number
  maquina: string
  inicio: string
  fim: string
  status: "planejada" | "liberada" | "em_producao" | "pausada" | "concluida" | "cancelada"
  prioridade: "baixa" | "media" | "alta"
}

export type Fornecedor = {
  id: string
  nome: string
  cnpj: string
  email: string
  telefone: string
  categoria: string
  status: "ativo" | "inativo"
}

export type Compra = {
  id: string
  fornecedor: string
  data: string
  valor: number
  status: "pendente" | "aprovada" | "recebida" | "cancelada"
}

export type EstoqueItem = {
  id: string
  codigo: string
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  localizacao: string
  lote: string
  validade: string
}

export type Manutencao = {
  id: string
  equipamento: string
  tipo: "preventiva" | "corretiva" | "preditiva"
  dataInicio: string
  dataFim: string
  status: "planejada" | "em_andamento" | "concluida" | "cancelada"
  responsavel: string
}

export type Equipamento = {
  id: string
  nome: string
  modelo: string
  fabricante: string
  dataAquisicao: string
  status: "operacional" | "manutencao" | "inativo"
}

export type QualidadeInspecao = {
  id: string
  tipo: "materia_prima" | "processo" | "produto_acabado"
  item: string
  data: string
  resultado: "aprovado" | "reprovado" | "pendente"
  responsavel: string
  observacoes: string
}

export type Funcionario = {
  id: string
  nome: string
  cargo: string
  departamento: string
  admissao: string
  status: "ativo" | "ferias" | "afastado" | "inativo"
}

export type ContaReceber = {
  id: string
  cliente: string
  documento: string
  emissao: string
  vencimento: string
  valor: number
  status: "aberto" | "pago" | "atrasado" | "cancelado"
}

export type ContaPagar = {
  id: string
  fornecedor: string
  documento: string
  emissao: string
  vencimento: string
  valor: number
  status: "aberto" | "pago" | "atrasado" | "cancelado"
}

export type Transportadora = {
  id: string
  nome: string
  cnpj: string
  email: string
  telefone: string
  status: "ativo" | "inativo"
}

export type Entrega = {
  id: string
  pedido: string
  transportadora: string
  dataEnvio: string
  dataEntrega: string
  status: "aguardando" | "em_transito" | "entregue" | "cancelada"
}

// Adicionar o tipo PlanoProducao
export type PlanoProducao = {
  id: string
  produto: string
  periodo: string
  quantidade: number
  prioridade: "baixa" | "media" | "alta"
  status: "ativo" | "concluido" | "cancelado"
  observacoes?: string
}

// Interface do contexto
interface DataContextType {
  // Vendas
  pedidos: Pedido[]
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>
  clientes: Cliente[]
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>
  produtos: Produto[]
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>

  // Produção
  ordensProducao: OrdemProducao[]
  setOrdensProducao: React.Dispatch<React.SetStateAction<OrdemProducao[]>>

  // Compras
  fornecedores: Fornecedor[]
  setFornecedores: React.Dispatch<React.SetStateAction<Fornecedor[]>>
  compras: Compra[]
  setCompras: React.Dispatch<React.SetStateAction<Compra[]>>

  // Estoque
  estoqueMateriaPrima: EstoqueItem[]
  setEstoqueMateriaPrima: React.Dispatch<React.SetStateAction<EstoqueItem[]>>
  estoqueProdutoAcabado: EstoqueItem[]
  setEstoqueProdutoAcabado: React.Dispatch<React.SetStateAction<EstoqueItem[]>>

  // Manutenção
  manutencoes: Manutencao[]
  setManutencoes: React.Dispatch<React.SetStateAction<Manutencao[]>>
  equipamentos: Equipamento[]
  setEquipamentos: React.Dispatch<React.SetStateAction<Equipamento[]>>

  // Qualidade
  qualidadeInspecoes: QualidadeInspecao[]
  setQualidadeInspecoes: React.Dispatch<React.SetStateAction<QualidadeInspecao[]>>

  // RH
  funcionarios: Funcionario[]
  setFuncionarios: React.Dispatch<React.SetStateAction<Funcionario[]>>

  // Financeiro
  contasReceber: ContaReceber[]
  setContasReceber: React.Dispatch<React.SetStateAction<ContaReceber[]>>
  contasPagar: ContaPagar[]
  setContasPagar: React.Dispatch<React.SetStateAction<ContaPagar[]>>

  // Logística
  transportadoras: Transportadora[]
  setTransportadoras: React.Dispatch<React.SetStateAction<Transportadora[]>>
  entregas: Entrega[]
  setEntregas: React.Dispatch<React.SetStateAction<Entrega[]>>

  // PCP
  planosProducao: PlanoProducao[]
  setPlanosProducao: React.Dispatch<React.SetStateAction<PlanoProducao[]>>
  adicionarPlanoProducao: (plano: Omit<PlanoProducao, "id">) => void

  // Funções utilitárias
  adicionarPedido: (pedido: Omit<Pedido, "id">) => void
  adicionarCliente: (cliente: Omit<Cliente, "id">) => void
  adicionarProduto: (produto: Omit<Produto, "id">) => void
  adicionarOrdemProducao: (ordem: Omit<OrdemProducao, "id">) => void
  adicionarFornecedor: (fornecedor: Omit<Fornecedor, "id">) => void
  adicionarCompra: (compra: Omit<Compra, "id">) => void
  adicionarItemEstoqueMP: (item: Omit<EstoqueItem, "id">) => void
  adicionarItemEstoquePA: (item: Omit<EstoqueItem, "id">) => void
  adicionarManutencao: (manutencao: Omit<Manutencao, "id">) => void
  adicionarEquipamento: (equipamento: Omit<Equipamento, "id">) => void
  adicionarInspecao: (inspecao: Omit<QualidadeInspecao, "id">) => void
  adicionarFuncionario: (funcionario: Omit<Funcionario, "id">) => void
  adicionarContaReceber: (conta: Omit<ContaReceber, "id">) => void
  adicionarContaPagar: (conta: Omit<ContaPagar, "id">) => void
  adicionarTransportadora: (transportadora: Omit<Transportadora, "id">) => void
  adicionarEntrega: (entrega: Omit<Entrega, "id">) => void
}

// Criação do contexto
const DataContext = createContext<DataContextType | undefined>(undefined)

// Provider
export function DataProvider({ children }: { children: React.ReactNode }) {
  // Estados
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock)
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock)
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock)
  const [ordensProducao, setOrdensProducao] = useState<OrdemProducao[]>(ordensMock)
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(fornecedoresMock)
  const [compras, setCompras] = useState<Compra[]>(comprasMock)
  const [estoqueMateriaPrima, setEstoqueMateriaPrima] = useState<EstoqueItem[]>(estoqueMateriaPrimaMock)
  const [estoqueProdutoAcabado, setEstoqueProdutoAcabado] = useState<EstoqueItem[]>(estoqueProdutoAcabadoMock)
  const [manutencoes, setManutencoes] = useState<Manutencao[]>(manutencoesMock)
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>(equipamentosMock)
  const [qualidadeInspecoes, setQualidadeInspecoes] = useState<QualidadeInspecao[]>(qualidadeInspecoesMock)
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(funcionariosMock)
  const [contasReceber, setContasReceber] = useState<ContaReceber[]>(contasReceberMock)
  const [contasPagar, setContasPagar] = useState<ContaPagar[]>(contasPagarMock)
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>(transportadorasMock)
  const [entregas, setEntregas] = useState<Entrega[]>(entregasMock)

  // PCP
  const [planosProducao, setPlanosProducao] = useState<PlanoProducao[]>([])

  // Funções utilitárias
  const gerarId = () => `ID-${Math.floor(Math.random() * 10000)}`

  const adicionarPedido = (pedido: Omit<Pedido, "id">) => {
    const novoPedido = { ...pedido, id: `PED-${Math.floor(Math.random() * 10000)}` }
    setPedidos((prev) => [...prev, novoPedido])
  }

  const adicionarCliente = (cliente: Omit<Cliente, "id">) => {
    const novoCliente = { ...cliente, id: `CLI-${Math.floor(Math.random() * 10000)}` }
    setClientes((prev) => [...prev, novoCliente])
  }

  const adicionarProduto = (produto: Omit<Produto, "id">) => {
    const novoProduto = { ...produto, id: `PROD-${Math.floor(Math.random() * 10000)}` }
    setProdutos((prev) => [...prev, novoProduto])
  }

  const adicionarOrdemProducao = (ordem: Omit<OrdemProducao, "id">) => {
    const novaOrdem = { ...ordem, id: `OP-${Math.floor(Math.random() * 10000)}` }
    setOrdensProducao((prev) => [...prev, novaOrdem])
  }

  const adicionarFornecedor = (fornecedor: Omit<Fornecedor, "id">) => {
    const novoFornecedor = { ...fornecedor, id: `FOR-${Math.floor(Math.random() * 10000)}` }
    setFornecedores((prev) => [...prev, novoFornecedor])
  }

  const adicionarCompra = (compra: Omit<Compra, "id">) => {
    const novaCompra = { ...compra, id: `OC-${Math.floor(Math.random() * 10000)}` }
    setCompras((prev) => [...prev, novaCompra])
  }

  const adicionarItemEstoqueMP = (item: Omit<EstoqueItem, "id">) => {
    const novoItem = { ...item, id: `MP-${Math.floor(Math.random() * 10000)}` }
    setEstoqueMateriaPrima((prev) => [...prev, novoItem])
  }

  const adicionarItemEstoquePA = (item: Omit<EstoqueItem, "id">) => {
    const novoItem = { ...item, id: `PA-${Math.floor(Math.random() * 10000)}` }
    setEstoqueProdutoAcabado((prev) => [...prev, novoItem])
  }

  const adicionarManutencao = (manutencao: Omit<Manutencao, "id">) => {
    const novaManutencao = { ...manutencao, id: `MAN-${Math.floor(Math.random() * 10000)}` }
    setManutencoes((prev) => [...prev, novaManutencao])
  }

  const adicionarEquipamento = (equipamento: Omit<Equipamento, "id">) => {
    const novoEquipamento = { ...equipamento, id: `EQ-${Math.floor(Math.random() * 10000)}` }
    setEquipamentos((prev) => [...prev, novoEquipamento])
  }

  const adicionarInspecao = (inspecao: Omit<QualidadeInspecao, "id">) => {
    const novaInspecao = { ...inspecao, id: `INSP-${Math.floor(Math.random() * 10000)}` }
    setQualidadeInspecoes((prev) => [...prev, novaInspecao])
  }

  const adicionarFuncionario = (funcionario: Omit<Funcionario, "id">) => {
    const novoFuncionario = { ...funcionario, id: `FUNC-${Math.floor(Math.random() * 10000)}` }
    setFuncionarios((prev) => [...prev, novoFuncionario])
  }

  const adicionarContaReceber = (conta: Omit<ContaReceber, "id">) => {
    const novaConta = { ...conta, id: `CR-${Math.floor(Math.random() * 10000)}` }
    setContasReceber((prev) => [...prev, novaConta])
  }

  const adicionarContaPagar = (conta: Omit<ContaPagar, "id">) => {
    const novaConta = { ...conta, id: `CP-${Math.floor(Math.random() * 10000)}` }
    setContasPagar((prev) => [...prev, novaConta])
  }

  const adicionarTransportadora = (transportadora: Omit<Transportadora, "id">) => {
    const novaTransportadora = { ...transportadora, id: `TRANSP-${Math.floor(Math.random() * 10000)}` }
    setTransportadoras((prev) => [...prev, novaTransportadora])
  }

  const adicionarEntrega = (entrega: Omit<Entrega, "id">) => {
    const novaEntrega = { ...entrega, id: `ENT-${Math.floor(Math.random() * 10000)}` }
    setEntregas((prev) => [...prev, novaEntrega])
  }

  // Adicionar função para adicionar plano de produção
  const adicionarPlanoProducao = (plano: Omit<PlanoProducao, "id">) => {
    const novoPlano = { ...plano, id: `PLAN-${Math.floor(Math.random() * 10000)}` }
    setPlanosProducao((prev) => [...prev, novoPlano])
  }

  return (
    <DataContext.Provider
      value={{
        pedidos,
        setPedidos,
        clientes,
        setClientes,
        produtos,
        setProdutos,
        ordensProducao,
        setOrdensProducao,
        fornecedores,
        setFornecedores,
        compras,
        setCompras,
        estoqueMateriaPrima,
        setEstoqueMateriaPrima,
        estoqueProdutoAcabado,
        setEstoqueProdutoAcabado,
        manutencoes,
        setManutencoes,
        equipamentos,
        setEquipamentos,
        qualidadeInspecoes,
        setQualidadeInspecoes,
        funcionarios,
        setFuncionarios,
        contasReceber,
        setContasReceber,
        contasPagar,
        setContasPagar,
        transportadoras,
        setTransportadoras,
        entregas,
        setEntregas,
        adicionarPedido,
        adicionarCliente,
        adicionarProduto,
        adicionarOrdemProducao,
        adicionarFornecedor,
        adicionarCompra,
        adicionarItemEstoqueMP,
        adicionarItemEstoquePA,
        adicionarManutencao,
        adicionarEquipamento,
        adicionarInspecao,
        adicionarFuncionario,
        adicionarContaReceber,
        adicionarContaPagar,
        adicionarTransportadora,
        adicionarEntrega,

        // PCP
        planosProducao,
        setPlanosProducao,
        adicionarPlanoProducao,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// Hook para usar o contexto
export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
