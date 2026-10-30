
package cl.aquachile.backend.controller;

import cl.aquachile.backend.dto.SolicitudEvaluacionDTO;
import cl.aquachile.backend.entity.SolicitudEvaluacion;
import cl.aquachile.backend.repository.SolicitudEvaluacionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudEvaluacionController {

    private final SolicitudEvaluacionRepository solicitudRepository;

    public SolicitudEvaluacionController(
            SolicitudEvaluacionRepository solicitudRepository) {
        this.solicitudRepository = solicitudRepository;
    }

    @GetMapping
    public List<SolicitudEvaluacionDTO> listarSolicitudes() {
        return solicitudRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .toList();
    }

    private SolicitudEvaluacionDTO convertirADTO(
            SolicitudEvaluacion solicitud) {

        String nombreCandidato = solicitud.getCandidato() != null
                ? solicitud.getCandidato().getNombre()
                : null;

        String nombreResponsable = solicitud.getResponsable() != null
                ? solicitud.getResponsable().getNombre()
                : null;

        return new SolicitudEvaluacionDTO(
                solicitud.getIdSolicitud(),
                nombreCandidato,
                nombreResponsable,
                solicitud.getCargo(),
                solicitud.getFamiliaCargo(),
                solicitud.getFechaSolicitud(),
                solicitud.getEstado(),
                solicitud.getObservaciones()
        );
    }
}
