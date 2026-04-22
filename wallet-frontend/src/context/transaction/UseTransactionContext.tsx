import { TransactionContext } from "@/interfaces/Transaction"
import { useContext } from "react"

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContextComponent"
    )
  }
  return context
}
