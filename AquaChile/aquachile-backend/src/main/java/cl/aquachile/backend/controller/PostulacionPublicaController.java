
package cl.aquachile.backend.controller;

import cl.aquachile.backend.entity.PostulacionPublica;
import cl.aquachile.backend.service.PostulacionPublicaService;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
@RestController
@RequestMapping("/api/postulaciones-publicas")
public class PostulacionPublicaController {

    private final PostulacionPublicaService postulacionService;

    public PostulacionPublicaController(
            PostulacionPublicaService postulacionService) {
        this.postulacionService = postulacionService;
    }

    @GetMapping("/estadisticas")
    public Map<String, Long> obtenerEstadisticas() {

        Map<String, Long> estadisticas = new HashMap<>();

        estadisticas.put("total", postulacionService.contarTodas());
        estadisticas.put("pendientes", postulacionService.contarPendientes());

        return estadisticas;
    }

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public PostulacionPublica crearPostulacion(
            @RequestParam String nombre,
            @RequestParam String correo,
            @RequestParam(required = false) String telefono,
            @RequestParam String familiaCargo,
            @RequestParam String cargo,
            @RequestParam("cvFile") MultipartFile cvFile) {

        try {
            return postulacionService.registrarPostulacion(
                    nombre,
                    correo,
                    telefono,
                    familiaCargo,
                    cargo,
                    cvFile
            );

        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    e.getMessage()
            );
        }
    }


}
