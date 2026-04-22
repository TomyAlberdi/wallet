import type { ReactNode } from "react"
import { toast } from "sonner"
import {
  WalletContext,
  type CreateWalletDTO,
  type Wallet,
  type WalletContextType,
} from "@/interfaces/Wallet"
import { fetchJson, getErrorMessage } from "@/lib/utils"

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/wallet`

interface WalletContextComponentProps {
  children: ReactNode
}

const WalletContextComponent: React.FC<WalletContextComponentProps> = ({
  children,
}) => {
  const getById: WalletContextType["getById"] = async (id) => {
    try {
      return await fetchJson<Wallet>(`${API_URL}/${id}`)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo obtener la wallet."
      )
      return null
    }
  }

  const list: WalletContextType["list"] = async () => {
    try {
      return await fetchJson<Wallet[]>(API_URL)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudieron listar las wallets."
      )
      return []
    }
  }

  const create: WalletContextType["create"] = async (dto: CreateWalletDTO) => {
    try {
      const createdWallet = await fetchJson<Wallet>(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      })
      toast.success("Wallet creada correctamente.")
      return createdWallet
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo crear la wallet."
      toast.error(message)
      throw new Error(message)
    }
  }

  const update: WalletContextType["update"] = async (
    id: string,
    dto: CreateWalletDTO
  ) => {
    try {
      const updatedWallet = await fetchJson<Wallet>(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      })
      toast.success("Wallet actualizada correctamente.")
      return updatedWallet
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la wallet."
      toast.error(message)
      throw new Error(message)
    }
  }

  const deleteWallet: WalletContextType["delete"] = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(await getErrorMessage(response))
      }

      toast.success("Wallet eliminada correctamente.")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo eliminar la wallet."
      toast.error(message)
      throw new Error(message)
    }
  }

  const value: WalletContextType = {
    getById,
    list,
    create,
    update,
    delete: deleteWallet,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export default WalletContextComponent