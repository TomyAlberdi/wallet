import type { Transaction } from "./transaction";

export type WalletType = "DIGITAL" | "CASH";

export interface CreateWalletDTO {
    name: string;
    currency: string;
    type: WalletType;
    annualInvestmentRate: number;
}

export interface PartialWalletDTO extends CreateWalletDTO {
    id: string;
    value: number;
}

export interface Wallet extends PartialWalletDTO {
    transactions: Transaction[];
}
