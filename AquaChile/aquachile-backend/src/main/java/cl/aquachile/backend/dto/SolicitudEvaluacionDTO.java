package cl.aquachile.backend.dto;

import java.time.LocalDate;

public record SolicitudEvaluacionDTO(
        Long idSolicitud,
        Long idCandidato,
        String nombreCandidato,
        String nombreResponsable,
        String cargo,
        String familiaCargo,
        LocalDate fechaSolicitud,
        String estado,
        String observaciones
) {
}