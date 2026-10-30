
package cl.aquachile.backend.controller;

import cl.aquachile.backend.dto.EvaluacionDTO;
import cl.aquachile.backend.entity.Evaluacion;
import cl.aquachile.backend.repository.EvaluacionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/evaluaciones")
public class EvaluacionController {

    private final EvaluacionRepository evaluacionRepository;

    public EvaluacionController(
            EvaluacionRepository evaluacionRepository) {
        this.evaluacionRepository = evaluacionRepository;
    }

    @GetMapping
    public List<EvaluacionDTO> listarEvaluaciones() {
        return evaluacionRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .toList();
    }

    private EvaluacionDTO convertirADTO(Evaluacion evaluacion) {
        var solicitud = evaluacion.getSolicitud();

        String nombreCandidato = solicitud.getCandidato() != null
                ? solicitud.getCandidato().getNombre()
                : null;

        return new EvaluacionDTO(
                evaluacion.getIdEvaluacion(),
                solicitud.getIdSolicitud(),
                nombreCandidato,
                solicitud.getCargo(),
                evaluacion.getFechaEvaluacion(),
                evaluacion.getEstado(),
                evaluacion.getResultadoGeneral(),
                evaluacion.getObservaciones()
        );
    }
}
