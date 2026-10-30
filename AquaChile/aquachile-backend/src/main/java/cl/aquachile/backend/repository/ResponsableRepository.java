package cl.aquachile.backend.repository;

import cl.aquachile.backend.entity.Responsable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResponsableRepository extends JpaRepository<Responsable, Long> {

    Optional<Responsable> findByCorreoIgnoreCase(String correo);
}
