"use client"

import WalletCard from "@/components/wallet-card"
import { useWalletContext } from "@/context/wallet/UseWalletContext"
import type { Wallet } from "@/interfaces/Wallet"
import { useEffect, useState } from "react"

const WalletsList = () => {
  const { list } = useWalletContext()
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const walletList = await list()
        setWallets(walletList)
      } catch (error) {
        console.error("Failed to fetch wallets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWallets()
  }, [list])

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading wallets...</div>
  }

  if (wallets.length === 0) {
    return <div className="text-center text-muted-foreground">No wallets yet. Create one to get started!</div>
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {wallets.map((wallet) => (
        <WalletCard key={wallet.id} wallet={wallet} />
      ))}
    </div>
  )
}

export default WalletsList
