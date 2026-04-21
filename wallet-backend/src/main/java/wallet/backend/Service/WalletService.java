package wallet.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wallet.backend.DTO.Wallet.CreateWalletDTO;
import wallet.backend.DTO.Wallet.PartialWalletDTO;
import wallet.backend.Exception.DuplicateResourceException;
import wallet.backend.Exception.ResourceNotFoundException;
import wallet.backend.Mapper.WalletMapper;
import wallet.backend.Model.Wallet;
import wallet.backend.Repository.WalletRepository;

@Service
@AllArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;

    public Wallet findWalletByID(String id) {
        return walletRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found with id: " + id));
    }

    public List<PartialWalletDTO> listPartialWallets() {
        return walletRepository.findAll()
                .stream()
                .map(WalletMapper::toDTO)
                .toList();
    }

    public Wallet createWallet(CreateWalletDTO createWalletDTO) {
        Wallet wallet = WalletMapper.toEntity(createWalletDTO);
        return walletRepository.save(wallet);
    }

    public Wallet updateWallet(String id, CreateWalletDTO updateWalletDTO) {
        Wallet existingWallet = findWalletByID(id);
        Wallet updatedWallet = WalletMapper.toEntity(updateWalletDTO);
        updatedWallet.setId(existingWallet.getId());
        return walletRepository.save(updatedWallet);
    }

    public void deleteWallet(String id) {
        Wallet existingWallet = findWalletByID(id);
        walletRepository.delete(existingWallet);
    }

}