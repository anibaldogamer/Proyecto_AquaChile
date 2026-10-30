package cl.aquachile.backend.security;

import cl.aquachile.backend.entity.Responsable;
import cl.aquachile.backend.repository.ResponsableRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ResponsableUserDetailsService implements UserDetailsService {

    private final ResponsableRepository responsableRepository;

    public ResponsableUserDetailsService(
            ResponsableRepository responsableRepository) {
        this.responsableRepository = responsableRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String correo)
            throws UsernameNotFoundException {

        Responsable responsable = responsableRepository
                .findByCorreoIgnoreCase(correo)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Responsable no encontrado"));

        return User.builder()
                .username(responsable.getCorreo())
                .password(
                        responsable.getPasswordHash() == null
                                ? ""
                                : responsable.getPasswordHash())
                .roles(responsable.getRol())
                .disabled(!Boolean.TRUE.equals(responsable.getActivo()))
                .build();
    }
}
