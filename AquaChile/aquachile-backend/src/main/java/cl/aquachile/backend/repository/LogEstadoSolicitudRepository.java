package cl.aquachile.backend.repository;

import cl.aquachile.backend.entity.LogEstadoSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogEstadoSolicitudRepository
        extends JpaRepository<LogEstadoSolicitud, Long> {
}
