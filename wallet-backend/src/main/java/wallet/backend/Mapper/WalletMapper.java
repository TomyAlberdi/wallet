package wallet.backend.Mapper;

import wallet.backend.DTO.Wallet.CreateWalletDTO;
import wallet.backend.Model.Wallet;

public class WalletMapper {

    public static Wallet toEntity(CreateWalletDTO createWalletDTO) {
        Wallet wallet = new Wallet();
        updateFromDTO(wallet, createWalletDTO);
        return wallet;
    }

    public static void updateFromDTO(Wallet wallet, UpdateWalletDTO updateWalletDTO) {
        wallet.setName(updateWalletDTO.getName());
        wallet.setCurrency(updateWalletDTO.getCurrency());
        wallet.setType(updateWalletDTO.getType());
        if (updateWalletDTO.getType() == WalletType.CASH) {
            wallet.setAnnualInvestmentRate(0.0);
        } else {
            wallet.setAnnualInvestmentRate(updateWalletDTO.getAnnualInvestmentRate());
        }
        wallet.setValue(0.0);
        wallet.setTransactions(new ArrayList<>());
    }
}