package com.example.backend.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PayPalConfig {

    private String clientId = "AcZHcrgsgp5aTuCNumQlhOmaRnu97NGQLDQ7FIiXTljd493GqO3Yna-H4wbZSN2gnc0d4rM5HGqpBvE1";
    private String clientSecret = "EKqV-LxEJ8El4p2hqU5-i6q_WU0-LfE0sm1bwWANXfDHt9l9v2CKxSbo23ATmgCrah_2U5BnyZF-tiBz";
    private String mode = "sandbox"; // Đổi thành "live" khi bạn sẵn sàng chạy ứng dụng thực tế

    @Bean
    public APIContext apiContext() throws PayPalRESTException {
        APIContext context = new APIContext(clientId, clientSecret, mode);
        return context;
    }
}
