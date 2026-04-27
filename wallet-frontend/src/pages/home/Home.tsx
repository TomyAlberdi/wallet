"use client"

import CreateTransactionDialog from "@/components/create-transaction-dialog"
import CreateWalletDialog from "@/components/create-wallet-dialog"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

const Home = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto w-full">
        <h1 className="mb-6 text-3xl font-bold">Wallets</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Wallet Creation Section */}
          <Card className="rounded-lg border border-foreground/10 p-6 gap-2 max-w-lg">
            <CardTitle className="text-xl font-semibold">
              Create Wallet
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create a new wallet to start managing your finances.
            </CardDescription>
            <CreateWalletDialog />
          </Card>
          {/* Transaction Creation Section */}
          <Card className="rounded-lg border border-foreground/10 p-6 gap-2 max-w-lg">
            <CardTitle className="text-xl font-semibold">
              Create Transaction
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Add a transaction to an existing wallet.
            </CardDescription>
            <CreateTransactionDialog />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
