
package cl.aquachile.backend.service;

import cl.aquachile.backend.entity.LogEstadoSolicitud;
import cl.aquachile.backend.entity.Responsable;
import cl.aquachile.backend.entity.SolicitudEvaluacion;
import cl.aquachile.backend.repository.LogEstadoSolicitudRepository;
import cl.aquachile.backend.repository.ResponsableRepository;
import cl.aquachile.backend.repository.SolicitudEvaluacionRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class SolicitudEvaluacionService {

    private final SolicitudEvaluacionRepository solicitudRepository;
    private final ResponsableRepository responsableRepository;
    private final LogEstadoSolicitudRepository logRepository;

    public SolicitudEvaluacionService(
            SolicitudEvaluacionRepository solicitudRepository,
            ResponsableRepository responsableRepository,
            LogEstadoSolicitudRepository logRepository) {
        this.solicitudRepository = solicitudRepository;
        this.responsableRepository = responsableRepository;
        this.logRepository = logRepository;
    }

    @Transactional
    public SolicitudEvaluacion actualizarEstado(
            Long idSolicitud,
            String nuevoEstado,
            Authentication authentication) {

        if (authentication == null ||
                authentication.getAuthorities().stream()
                        .noneMatch(a -> a.getAuthority().equals("ROLE_EVALUADOR"))) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Solo un evaluador puede modificar el estado."
            );
        }

        List<String> estadosPermitidos =
                List.of("Pendiente", "En proceso", "Finalizada");

        if (!estadosPermitidos.contains(nuevoEstado)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El estado indicado no es válido."
            );
        }

        SolicitudEvaluacion solicitud = solicitudRepository.findById(idSolicitud)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Solicitud no encontrada."
                ));

        Responsable responsable = responsableRepository
                .findByCorreoIgnoreCase(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Responsable no encontrado."
                ));

        String estadoAnterior = solicitud.getEstado();

        if (estadoAnterior.equals(nuevoEstado)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La solicitud ya tiene ese estado."
            );
        }

        solicitud.setEstado(nuevoEstado);
        solicitudRepository.save(solicitud);

        LogEstadoSolicitud log = new LogEstadoSolicitud();
        log.setSolicitud(solicitud);
        log.setResponsable(responsable);
        log.setEstadoAnterior(estadoAnterior);
        log.setEstadoNuevo(nuevoEstado);
        log.setFechaCambio(OffsetDateTime.now());

        logRepository.save(log);

        return solicitud;
    }
}
