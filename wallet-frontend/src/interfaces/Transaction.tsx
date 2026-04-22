export type TransactionType = "INCOME" | "EXPENSE";

export interface PartialTransactionDTO {
    title: string;
    description: string;
    value: number;
    type: TransactionType;
}

export interface CreateTransactionDTO extends PartialTransactionDTO {
    walletId: string;
}

export interface Transaction extends PartialTransactionDTO {
    id: string;
    dateTime: string;
}