"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ShoppingCart,
  Wrench,
  Package,
  ClipboardList,
  Factory,
  BadgeCheck,
  PenToolIcon as Tool,
  Truck,
  DollarSign,
  Users,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const modules = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Vendas",
    href: "/vendas",
    icon: ShoppingCart,
  },
  {
    name: "Engenharia",
    href: "/engenharia",
    icon: Wrench,
  },
  {
    name: "Compras",
    href: "/compras",
    icon: ShoppingBag,
  },
  {
    name: "Estoque",
    href: "/estoque",
    icon: Package,
  },
  {
    name: "PCP",
    href: "/pcp",
    icon: ClipboardList,
  },
  {
    name: "Produção",
    href: "/producao",
    icon: Factory,
  },
  {
    name: "Qualidade",
    href: "/qualidade",
    icon: BadgeCheck,
  },
  {
    name: "Manutenção",
    href: "/manutencao",
    icon: Tool,
  },
  {
    name: "Logística",
    href: "/logistica",
    icon: Truck,
  },
  {
    name: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },
  {
    name: "RH",
    href: "/rh",
    icon: Users,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Indústria de Plásticos</h2>
            <p className="text-sm text-muted-foreground">Sistema Intranet</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {modules.map((module) => {
              const isActive = pathname === module.href
              return (
                <Link key={module.href} href={module.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start gap-2", isActive ? "bg-secondary" : "")}
                  >
                    <module.icon className="h-4 w-4" />
                    {module.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-xs font-bold">JP</span>
              </div>
              <div>
                <p className="text-sm font-medium">João Paulo</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
