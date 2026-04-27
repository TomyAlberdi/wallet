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
import { useWalletContext } from "@/context/wallet/UseWalletContext"
import type { CreateWalletDTO, WalletType } from "@/interfaces/Wallet"
import { useState } from "react"

interface CreateWalletDialogProps {
  onSuccess?: () => void
}

const CreateWalletDialog = ({ onSuccess }: CreateWalletDialogProps) => {
  const walletContext = useWalletContext()
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<CreateWalletDTO>({
    name: "",
    currency: "USD",
    type: "DIGITAL",
    annualInvestmentRate: 0,
  })

  const handleCreate = async () => {
    try {
      await walletContext.create(form)
      // Reset form
      setForm({
        name: "",
        currency: "USD",
        type: "DIGITAL",
        annualInvestmentRate: 0,
      })
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error creating wallet:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create New Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Wallet</DialogTitle>
          <DialogDescription>
            Fill in the details to create your wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Wallet Name
            </label>
            <input
              type="text"
              placeholder="e.g., My Savings"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-foreground/10 rounded-md bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Currency
            </label>
            <input
              type="text"
              placeholder="e.g., USD"
              value={form.currency}
              onChange={(e) =>
                setForm({
                  ...form,
                  currency: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-foreground/10 rounded-md bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Wallet Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as WalletType,
                })
              }
              className="w-full px-3 py-2 border border-foreground/10 rounded-md bg-background text-foreground"
            >
              <option value="DIGITAL">Digital</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Annual Investment Rate (%)
            </label>
            <input
              type="number"
              placeholder="0.0"
              step="0.1"
              value={form.annualInvestmentRate}
              onChange={(e) =>
                setForm({
                  ...form,
                  annualInvestmentRate: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-foreground/10 rounded-md bg-background text-foreground"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Wallet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWalletDialog
