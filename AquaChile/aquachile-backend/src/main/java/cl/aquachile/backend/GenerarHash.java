package cl.aquachile.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerarHash {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = System.getenv("AQUACHILE_TEST_PASSWORD");

        if (password == null || password.isBlank()) {
            throw new IllegalStateException(
                    "Define la variable AQUACHILE_TEST_PASSWORD primero."
            );
        }

        System.out.println(encoder.encode(password));
    }
}
