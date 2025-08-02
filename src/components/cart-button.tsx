"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "./cart-sidebar"

export function CartButton() {
  const { state } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative transition-all duration-300 hover:scale-105 bg-white border border-gray-300 hover:border-gray-400 dark:bg-transparent dark:border-gray-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-4 w-4 text-gray-700 dark:text-gray-200" />
        {state.itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 animate-pulse">
            {state.itemCount}
          </Badge>
        )}
      </Button>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
