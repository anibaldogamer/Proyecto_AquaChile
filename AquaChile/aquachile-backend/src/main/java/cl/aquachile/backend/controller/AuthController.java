
package cl.aquachile.backend.controller;

import cl.aquachile.backend.entity.Responsable;
import cl.aquachile.backend.repository.ResponsableRepository;
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
    private final ResponsableRepository responsableRepository;

    private final SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();

    public AuthController(
            AuthenticationManager authenticationManager,
            ResponsableRepository responsableRepository) {
        this.authenticationManager = authenticationManager;
        this.responsableRepository = responsableRepository;
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.correo(), request.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        securityContextRepository.saveContext(
                SecurityContextHolder.getContext(), httpRequest, httpResponse);

        return obtenerDatosUsuario(authentication);
    }

    @GetMapping("/me")
    public Map<String, Object> obtenerSesion(Authentication authentication) {
        return obtenerDatosUsuario(authentication);
    }

    private Map<String, Object> obtenerDatosUsuario(Authentication authentication) {
        Responsable responsable = responsableRepository
                .findByCorreoIgnoreCase(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));

        return Map.of(
                "idResponsable", responsable.getIdResponsable(),
                "nombre", responsable.getNombre(),
                "correo", responsable.getCorreo(),
                "rol", responsable.getRol().getNombre()
        );
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return Map.of("mensaje", "Sesión cerrada correctamente");
    }

    public record LoginRequest(String correo, String password) {}
}
