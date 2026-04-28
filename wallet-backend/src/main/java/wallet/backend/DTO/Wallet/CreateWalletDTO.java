package wallet.backend.DTO.Wallet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wallet.backend.Model.WalletType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateWalletDTO {
    private String name;
    private String currency;
    private WalletType type;
    private double annualInvestmentRate;
    private String color;
}