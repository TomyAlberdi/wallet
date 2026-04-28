import { createContext } from "react"
import type { Transaction } from "./Transaction"

export type WalletType = "DIGITAL" | "CASH"

export interface CreateWalletDTO {
  name: string
  currency: string
  type: WalletType
  annualInvestmentRate: number
  color: string
}

export interface PartialWalletDTO extends CreateWalletDTO {
  id: string
  value: number
}

export interface Wallet extends PartialWalletDTO {
  transactions: Transaction[]
}

export interface WalletContextType {
  getById: (id: string) => Promise<Wallet | null>
  list: () => Promise<Wallet[]>
  create: (dto: CreateWalletDTO) => Promise<Wallet>
  update: (id: string, dto: CreateWalletDTO) => Promise<Wallet>
  delete: (id: string) => Promise<void>
}

export const WalletContext = createContext<WalletContextType | null>(null)
