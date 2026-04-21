package wallet.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import wallet.backend.Model.Wallet;

@Repository
public interface WalletRepository extends MongoRepository<Wallet, String> {
}