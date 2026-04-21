package wallet.backend.DTO.Transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import wallet.backend.Model.TransactionType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTransactionDTO {
    private String walletId;
    private String title;
    private String description;
    private double value;
    private TransactionType type;
}