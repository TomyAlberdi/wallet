package wallet.backend.Model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    private String id;
    private LocalDateTime dateTime;
    private String title;
    private String description;
    private double value;
    private TransactionType type;
}
