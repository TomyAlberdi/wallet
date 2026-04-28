package wallet.backend.Mapper;

import java.util.ArrayList;

import wallet.backend.DTO.Wallet.CreateWalletDTO;
import wallet.backend.DTO.Wallet.PartialWalletDTO;
import wallet.backend.Model.Wallet;
import wallet.backend.Model.WalletType;

public class WalletMapper {

    public static Wallet toEntity(CreateWalletDTO createWalletDTO) {
        Wallet wallet = new Wallet();
        updateFromDTO(wallet, createWalletDTO);
        return wallet;
    }

    public static void updateFromDTO(Wallet wallet, CreateWalletDTO updateWalletDTO) {
        wallet.setName(updateWalletDTO.getName());
        wallet.setCurrency(updateWalletDTO.getCurrency());
        wallet.setType(updateWalletDTO.getType());
        wallet.setColor(updateWalletDTO.getColor());
        if (updateWalletDTO.getType() == WalletType.CASH) {
            wallet.setAnnualInvestmentRate(0.0);
        } else {
            wallet.setAnnualInvestmentRate(updateWalletDTO.getAnnualInvestmentRate());
        }
        wallet.setValue(0.0);
        wallet.setTransactions(new ArrayList<>());
    }

    public static PartialWalletDTO toDTO(Wallet wallet) {
        PartialWalletDTO partialWalletDTO = new PartialWalletDTO();
        partialWalletDTO.setId(wallet.getId());
        partialWalletDTO.setName(wallet.getName());
        partialWalletDTO.setValue(wallet.getValue());
        partialWalletDTO.setCurrency(wallet.getCurrency());
        partialWalletDTO.setType(wallet.getType());
        partialWalletDTO.setAnnualInvestmentRate(wallet.getAnnualInvestmentRate());
        partialWalletDTO.setColor(wallet.getColor());
        return partialWalletDTO;
    }
}