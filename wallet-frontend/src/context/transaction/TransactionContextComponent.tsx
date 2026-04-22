import type { ReactNode } from "react"
import { toast } from "sonner"
import {
  TransactionContext,
  type CreateTransactionDTO,
  type Transaction,
  type TransactionContextType,
} from "@/interfaces/Transaction"
import type { Wallet } from "@/interfaces/Wallet"
import { fetchJson, getErrorMessage } from "@/lib/utils"

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/wallet`

interface TransactionContextComponentProps {
  children: ReactNode
}

const parseCompositeId = (id: string): { walletId: string; transactionId: string } => {
  const [walletId, transactionId] = id.split("/")
  if (!walletId || !transactionId) {
    throw new Error("Invalid transaction id. Use format: walletId/transactionId.")
  }
  return { walletId, transactionId }
}

const TransactionContextComponent: React.FC<TransactionContextComponentProps> = ({
  children,
}) => {
  const getById: TransactionContextType["getById"] = async (id) => {
    try {
      const { walletId, transactionId } = parseCompositeId(id)
      return await fetchJson<Transaction>(
        `${API_URL}/${walletId}/transactions/${transactionId}`
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo obtener la transaccion."
      )
      return null
    }
  }

  const create: TransactionContextType["create"] = async (
    dto: CreateTransactionDTO
  ) => {
    try {
      const createdTransactionWallet = await fetchJson<Wallet>(
        `${API_URL}/${dto.walletId}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        }
      )
      toast.success("Transaccion creada correctamente.")
      return createdTransactionWallet
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo crear la transaccion."
      toast.error(message)
      throw new Error(message)
    }
  }

  const update: TransactionContextType["update"] = async (
    id: string,
    dto: CreateTransactionDTO
  ) => {
    try {
      const updatedTransactionWallet = await fetchJson<Wallet>(
        `${API_URL}/${dto.walletId}/transactions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        }
      )
      toast.success("Transaccion actualizada correctamente.")
      return updatedTransactionWallet
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la transaccion."
      toast.error(message)
      throw new Error(message)
    }
  }

  const deleteTransaction: TransactionContextType["delete"] = async (id: string) => {
    try {
      const { walletId, transactionId } = parseCompositeId(id)
      const response = await fetch(
        `${API_URL}/${walletId}/transactions/${transactionId}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error(await getErrorMessage(response))
      }

      toast.success("Transaccion eliminada correctamente.")
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la transaccion."
      toast.error(message)
      throw new Error(message)
    }
  }

  const value: TransactionContextType = {
    getById,
    create,
    update,
    delete: deleteTransaction,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContextComponent
