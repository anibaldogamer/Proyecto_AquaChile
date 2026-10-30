
package cl.aquachile.backend.dto;

import java.time.LocalDate;

public record EvaluacionDTO(
        Long idEvaluacion,
        Long idSolicitud,
        String nombreCandidato,
        String cargo,
        LocalDate fechaEvaluacion,
        String estado,
        String resultadoGeneral,
        String observaciones
) {
}
