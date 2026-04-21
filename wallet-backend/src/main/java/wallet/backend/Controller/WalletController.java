package wallet.backend.Controller;

import java.util.List;

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
import wallet.backend.DTO.Wallet.CreateWalletDTO;
import wallet.backend.DTO.Wallet.PartialWalletDTO;
import wallet.backend.Model.Wallet;
import wallet.backend.Service.WalletService;

@RestController
@RequestMapping("/wallet")
@AllArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/{id}")
    public ResponseEntity<Wallet> findWalletByID(@PathVariable String id) {
        return ResponseEntity.ok(walletService.findWalletByID(id));
    }

    @GetMapping
    public ResponseEntity<List<PartialWalletDTO>> listPartialWallets() {
        return ResponseEntity.ok(walletService.listPartialWallets());
    }

    @PostMapping
    public ResponseEntity<Wallet> createWallet(@RequestBody CreateWalletDTO createWalletDTO) {
        Wallet createdWallet = walletService.createWallet(createWalletDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWallet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable String id, @RequestBody CreateWalletDTO updateWalletDTO) {
        return ResponseEntity.ok(walletService.updateWallet(id, updateWalletDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWallet(@PathVariable String id) {
        walletService.deleteWallet(id);
        return ResponseEntity.noContent().build();
    }
}
