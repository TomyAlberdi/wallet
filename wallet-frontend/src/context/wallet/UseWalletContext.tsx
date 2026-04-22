import { WalletContext } from "@/interfaces/Wallet"
import { useContext } from "react"

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error(
      "useWalletContext must be used within a WalletContextComponent"
    )
  }
  return context
}
