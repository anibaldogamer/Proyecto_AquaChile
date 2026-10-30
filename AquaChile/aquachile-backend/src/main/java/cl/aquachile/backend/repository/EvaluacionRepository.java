package cl.aquachile.backend.repository;

import cl.aquachile.backend.entity.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvaluacionRepository extends JpaRepository<Evaluacion, Long> {
}
