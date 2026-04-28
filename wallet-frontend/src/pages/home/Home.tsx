"use client"

import CreateTransactionDialog from "@/components/create-transaction-dialog"
import CreateWalletDialog from "@/components/create-wallet-dialog"
import WalletsList from "@/components/wallets-list"

const Home = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto w-full space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 border border-red-500 md:flex-row">
          <h1 className="mr-auto text-3xl font-bold">Wallets</h1>
          {/* Wallet Creation Section */}
          <div className="w-full md:w-auto">
            <CreateWalletDialog />
          </div>
          {/* Transaction Creation Section */}
          <div className="w-full md:w-auto">
            <CreateTransactionDialog />
          </div>
        </div>
        
        {/* Wallets List Section */}
        <div>
          <WalletsList />
        </div>
      </div>
    </div>
  )
}

export default Home
