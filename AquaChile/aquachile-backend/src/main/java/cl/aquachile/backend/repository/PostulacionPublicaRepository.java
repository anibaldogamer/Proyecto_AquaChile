
package cl.aquachile.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.aquachile.backend.entity.PostulacionPublica;

@Repository

public interface PostulacionPublicaRepository
        extends JpaRepository<PostulacionPublica, Long> {

            long countByEstado(String estado);
}
