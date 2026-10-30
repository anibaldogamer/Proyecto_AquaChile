
package cl.aquachile.backend.controller;

import cl.aquachile.backend.entity.Candidato;
import cl.aquachile.backend.repository.CandidatoRepository;
import cl.aquachile.backend.service.CandidatoService;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import cl.aquachile.backend.service.SupabaseStorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/candidatos")
public class CandidatoController {

    private final CandidatoRepository candidatoRepository;
    private final CandidatoService candidatoService;
    private final SupabaseStorageService storageService;

    public CandidatoController(
            CandidatoRepository candidatoRepository,
            CandidatoService candidatoService,
            SupabaseStorageService storageService) {

        this.candidatoRepository = candidatoRepository;
        this.candidatoService = candidatoService;
        this.storageService = storageService;
    }

    @GetMapping
    public List<Candidato> listarCandidatos() {
        return candidatoRepository.findAll();
    }

    @GetMapping("/{id}/cv")
    public ResponseEntity<byte[]> obtenerCv(
            @PathVariable Long id,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Debe iniciar sesión para visualizar el CV."
            );
        }

        Candidato candidato = candidatoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró el candidato."
                ));

        if (candidato.getCvPath() == null || candidato.getCvPath().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "El candidato no tiene un CV registrado."
            );
        }

        byte[] archivo = storageService.obtenerCv(candidato.getCvPath());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"CV_" + id + ".pdf\""
                )
                .body(archivo);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Candidato crearCandidato(
            @RequestParam String nombre,
            @RequestParam String correo,
            @RequestParam String telefono,
            @RequestParam String cargo,
            @RequestParam String familiaCargo,
            @RequestParam(required = false) String observaciones,
            @RequestParam("cvFile") MultipartFile cvFile,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Debe iniciar sesión para registrar un candidato."
            );
        }

        if (nombre == null || nombre.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre es obligatorio."
            );
        }

        if (correo == null || correo.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El correo es obligatorio."
            );
        }

        if (telefono == null || telefono.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El teléfono es obligatorio."
            );
        }

        if (cargo == null || cargo.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El cargo es obligatorio."
            );
        }

        if (familiaCargo == null || familiaCargo.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La familia de cargo es obligatoria."
            );
        }

        if (cvFile == null || cvFile.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Debe adjuntar un CV."
            );
        }

        try {
            return candidatoService.registrarCandidato(
                    nombre,
                    correo,
                    telefono,
                    cargo,
                    familiaCargo,
                    observaciones,
                    authentication.getName(),
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
