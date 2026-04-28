import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Wallet } from "@/interfaces/Wallet"

interface WalletCardProps {
  wallet: Wallet
}

const WalletCard = ({ wallet }: WalletCardProps) => {
  return (
    <Card
      className="border-0"
      style={{
        backgroundColor: wallet.color,
      }}
    >
      <CardHeader>
        <CardTitle className="text-white">{wallet.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-white">
          <p className="text-sm font-semibold">Currency</p>
          <p className="text-lg">{wallet.currency}</p>
        </div>
        <div className="text-white">
          <p className="text-sm font-semibold">Value</p>
          <p className="text-lg">{wallet.value.toFixed(2)}</p>
        </div>
        {wallet.annualInvestmentRate && wallet.annualInvestmentRate > 0 && (
          <div className="text-white">
            <p className="text-sm font-semibold">Annual Investment Rate</p>
            <p className="text-lg">{wallet.annualInvestmentRate.toFixed(2)}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default WalletCard
