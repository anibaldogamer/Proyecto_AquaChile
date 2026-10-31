
package cl.aquachile.backend.controller;

import cl.aquachile.backend.dto.SolicitudEvaluacionDTO;
import cl.aquachile.backend.entity.SolicitudEvaluacion;
import cl.aquachile.backend.repository.SolicitudEvaluacionRepository;
import cl.aquachile.backend.service.SolicitudEvaluacionService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudEvaluacionController {

    private final SolicitudEvaluacionRepository solicitudRepository;
    private final SolicitudEvaluacionService solicitudService;

    public SolicitudEvaluacionController(
            SolicitudEvaluacionRepository solicitudRepository,
            SolicitudEvaluacionService solicitudService) {
        this.solicitudRepository = solicitudRepository;
        this.solicitudService = solicitudService;
    }

    @GetMapping
    public List<SolicitudEvaluacionDTO> listarSolicitudes() {
        return solicitudRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .toList();
    }

    @PatchMapping("/{id}/estado")
    public Map<String, String> actualizarEstado(
            @PathVariable Long id,
            @RequestBody ActualizarEstadoRequest request,
            Authentication authentication) {

        solicitudService.actualizarEstado(
                id,
                request.estado(),
                authentication
        );

        return Map.of(
                "mensaje", "Estado actualizado correctamente",
                "estado", request.estado()
        );
    }

    private SolicitudEvaluacionDTO convertirADTO(
            SolicitudEvaluacion solicitud) {

        Long idCandidato = solicitud.getCandidato() != null
                ? solicitud.getCandidato().getIdCandidato()
                : null;

        String nombreCandidato = solicitud.getCandidato() != null
                ? solicitud.getCandidato().getNombre()
                : null;

        String nombreResponsable = solicitud.getResponsable() != null
                ? solicitud.getResponsable().getNombre()
                : null;

        return new SolicitudEvaluacionDTO(
                solicitud.getIdSolicitud(),
                idCandidato,
                nombreCandidato,
                nombreResponsable,
                solicitud.getCargo(),
                solicitud.getFamiliaCargo(),
                solicitud.getFechaSolicitud(),
                solicitud.getEstado(),
                solicitud.getObservaciones()
        );
    }

    public record ActualizarEstadoRequest(String estado) {
    }
}
