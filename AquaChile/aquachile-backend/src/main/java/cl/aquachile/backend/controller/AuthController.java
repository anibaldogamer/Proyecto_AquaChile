
package cl.aquachile.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.correo(),
                                request.password()
                        )
                );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        securityContextRepository.saveContext(
            SecurityContextHolder.getContext(),
            httpRequest,
            httpResponse
        );

        return Map.of(
                "mensaje", "Inicio de sesión exitoso",
                "correo", authentication.getName(),
                "rol", authentication.getAuthorities()
                        .iterator().next().getAuthority()
        );
    }

    @GetMapping("/me")
    public Map<String, String> obtenerSesion(
            Authentication authentication) {

        return Map.of(
                "correo", authentication.getName(),
                "rol", authentication.getAuthorities()
                        .iterator().next().getAuthority()
        );
    }

    @PostMapping("/logout")
    public Map<String, String> logout(
            HttpServletRequest request) {

        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return Map.of(
                "mensaje", "Sesión cerrada correctamente"
        );
    }

    public record LoginRequest(String correo, String password) {}
}
