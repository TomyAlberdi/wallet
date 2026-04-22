import { createContext } from "react"
import type { Wallet } from "./Wallet"

export type TransactionType = "INCOME" | "EXPENSE"

export interface PartialTransactionDTO {
  title: string
  description: string
  value: number
  type: TransactionType
}

export interface CreateTransactionDTO extends PartialTransactionDTO {
  walletId: string
}

export interface Transaction extends PartialTransactionDTO {
  id: string
  dateTime: string
}

export interface TransactionContextType {
  getById: (id: string) => Promise<Transaction | null>
  create: (dto: CreateTransactionDTO) => Promise<Wallet>
  update: (id: string, dto: CreateTransactionDTO) => Promise<Wallet>
  delete: (id: string) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType | null>(
  null
)
