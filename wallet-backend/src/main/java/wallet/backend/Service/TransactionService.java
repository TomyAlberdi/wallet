package wallet.backend.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wallet.backend.DTO.Transaction.CreateTransactionDTO;
import wallet.backend.Exception.ResourceNotFoundException;
import wallet.backend.Model.Transaction;
import wallet.backend.Model.TransactionType;
import wallet.backend.Model.Wallet;
import wallet.backend.Repository.WalletRepository;

@Service
@AllArgsConstructor
public class TransactionService {

    private final WalletRepository walletRepository;
    private final WalletService walletService;

    public Wallet addTransaction(String walletId, CreateTransactionDTO createTransactionDTO) {
        Wallet wallet = walletService.findWalletByID(walletId);
        List<Transaction> transactions = ensureTransactions(wallet);

        Transaction transaction = new Transaction();
        transaction.setId(UUID.randomUUID().toString());
        transaction.setDateTime(LocalDateTime.now());
        transaction.setTitle(createTransactionDTO.getTitle());
        transaction.setDescription(createTransactionDTO.getDescription());
        transaction.setValue(createTransactionDTO.getValue());
        transaction.setType(createTransactionDTO.getType());

        transactions.add(transaction);
        wallet.setValue(calculateWalletValue(transactions));
        return walletRepository.save(wallet);
    }

    public Wallet updateTransaction(String walletId, String transactionId, CreateTransactionDTO updateTransactionDTO) {
        Wallet wallet = walletService.findWalletByID(walletId);
        List<Transaction> transactions = ensureTransactions(wallet);

        Transaction transaction = transactions.stream()
                .filter(item -> item.getId().equals(transactionId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Transaction not found with id: " + transactionId + " in wallet: " + walletId));

        transaction.setTitle(updateTransactionDTO.getTitle());
        transaction.setDescription(updateTransactionDTO.getDescription());
        transaction.setValue(updateTransactionDTO.getValue());
        transaction.setType(updateTransactionDTO.getType());

        wallet.setValue(calculateWalletValue(transactions));
        return walletRepository.save(wallet);
    }

    public Wallet removeTransaction(String walletId, String transactionId) {
        Wallet wallet = walletService.findWalletByID(walletId);
        List<Transaction> transactions = ensureTransactions(wallet);

        boolean removed = transactions.removeIf(item -> item.getId().equals(transactionId));
        if (!removed) {
            throw new ResourceNotFoundException(
                    "Transaction not found with id: " + transactionId + " in wallet: " + walletId);
        }

        wallet.setValue(calculateWalletValue(transactions));
        return walletRepository.save(wallet);
    }

    private List<Transaction> ensureTransactions(Wallet wallet) {
        if (wallet.getTransactions() == null) {
            wallet.setTransactions(new ArrayList<>());
        }
        return wallet.getTransactions();
    }

    private double calculateWalletValue(List<Transaction> transactions) {
        return transactions.stream()
                .mapToDouble(transaction -> transaction.getType() == TransactionType.INCOME
                        ? transaction.getValue()
                        : -transaction.getValue())
                .sum();
    }
}
