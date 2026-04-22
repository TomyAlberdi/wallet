package wallet.backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import wallet.backend.DTO.Transaction.CreateTransactionDTO;
import wallet.backend.Model.Transaction;
import wallet.backend.Model.Wallet;
import wallet.backend.Service.TransactionService;

@RestController
@RequestMapping("/wallet/{walletId}/transactions")
@AllArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Wallet> addTransaction(
            @PathVariable String walletId,
            @RequestBody CreateTransactionDTO createTransactionDTO) {
        Wallet updatedWallet = transactionService.addTransaction(walletId, createTransactionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedWallet);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<Wallet> updateTransaction(
            @PathVariable String walletId,
            @PathVariable String transactionId,
            @RequestBody CreateTransactionDTO updateTransactionDTO) {
        return ResponseEntity.ok(transactionService.updateTransaction(walletId, transactionId, updateTransactionDTO));
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Wallet> removeTransaction(
            @PathVariable String walletId,
            @PathVariable String transactionId) {
        return ResponseEntity.ok(transactionService.removeTransaction(walletId, transactionId));
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> findTransactionByID(
            @PathVariable String walletId,
            @PathVariable String transactionId) {
        return ResponseEntity.ok(transactionService.findTransactionByID(walletId, transactionId));
    }
}
