package cl.aquachile.backend.repository;

import cl.aquachile.backend.entity.SolicitudEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudEvaluacionRepository extends JpaRepository<SolicitudEvaluacion, Long> {
}
