"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTransactionContext } from "@/context/transaction/UseTransactionContext"
import { useWalletContext } from "@/context/wallet/UseWalletContext"
import type {
  CreateTransactionDTO,
  TransactionType,
} from "@/interfaces/Transaction"
import type { Wallet } from "@/interfaces/Wallet"
import { BanknoteArrowDown } from "lucide-react"
import { useState } from "react"

interface CreateTransactionDialogProps {
  onSuccess?: () => void
}

const CreateTransactionDialog = ({
  onSuccess,
}: CreateTransactionDialogProps) => {
  const transactionContext = useTransactionContext()
  const walletContext = useWalletContext()
  const [open, setOpen] = useState(false)
  const [wallets, setWallets] = useState<Wallet[]>([])

  const [form, setForm] = useState<CreateTransactionDTO>({
    title: "",
    description: "",
    value: 0,
    type: "INCOME",
    walletId: "",
  })

  const handleOpenDialog = async () => {
    const availableWallets = await walletContext.list()
    setWallets(availableWallets)
  }

  const handleCreate = async () => {
    try {
      await transactionContext.create(form)
      // Reset form
      setForm({
        title: "",
        description: "",
        value: 0,
        type: "INCOME",
        walletId: "",
      })
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error creating transaction:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={handleOpenDialog}>
          <BanknoteArrowDown />
          Create New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Transaction</DialogTitle>
          <DialogDescription>
            Add a transaction to one of your wallets.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Select Wallet
            </label>
            <select
              value={form.walletId}
              onChange={(e) =>
                setForm({
                  ...form,
                  walletId: e.target.value,
                })
              }
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-foreground"
            >
              <option value="">-- Select a wallet --</option>
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="e.g., Salary"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="e.g., Monthly salary"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-foreground"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              step="0.01"
              value={form.value}
              onChange={(e) =>
                setForm({
                  ...form,
                  value: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Transaction Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as TransactionType,
                })
              }
              className="w-full rounded-md border border-foreground/10 bg-background px-3 py-2 text-foreground"
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTransactionDialog
