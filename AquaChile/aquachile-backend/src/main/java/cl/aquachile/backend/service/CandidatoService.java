package cl.aquachile.backend.service;

import cl.aquachile.backend.entity.Candidato;
import cl.aquachile.backend.entity.Responsable;
import cl.aquachile.backend.entity.SolicitudEvaluacion;
import cl.aquachile.backend.repository.CandidatoRepository;
import cl.aquachile.backend.repository.ResponsableRepository;
import cl.aquachile.backend.repository.SolicitudEvaluacionRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
public class CandidatoService {

    private final CandidatoRepository candidatoRepository;
    private final SolicitudEvaluacionRepository solicitudRepository;
    private final ResponsableRepository responsableRepository;
    private final SupabaseStorageService storageService;

    public CandidatoService(
            CandidatoRepository candidatoRepository,
            SolicitudEvaluacionRepository solicitudRepository,
            ResponsableRepository responsableRepository,
            SupabaseStorageService storageService) {

        this.candidatoRepository = candidatoRepository;
        this.solicitudRepository = solicitudRepository;
        this.responsableRepository = responsableRepository;
        this.storageService = storageService;
    }

    @Transactional
    public Candidato registrarCandidato(
            String nombre,
            String correo,
            String telefono,
            String cargo,
            String familiaCargo,
            String observaciones,
            String correoResponsable,
            MultipartFile cvFile) {

        Responsable responsable = responsableRepository
                .findByCorreoIgnoreCase(correoResponsable)
                .orElseThrow(() ->
                        new IllegalArgumentException("No se encontró al responsable autenticado."));

        Candidato candidato = new Candidato();
        candidato.setNombre(nombre.trim());
        candidato.setCorreo(correo.trim());
        candidato.setTelefono(telefono.trim());
        candidato.setFechaCreacion(java.time.OffsetDateTime.now());

        Candidato candidatoGuardado = candidatoRepository.save(candidato);

        String rutaCv = storageService.subirCv(
                candidatoGuardado.getIdCandidato(),
                candidatoGuardado.getNombre(),
                cvFile
        );

        candidatoGuardado.setCvPath(rutaCv);
        candidatoRepository.save(candidatoGuardado);

        SolicitudEvaluacion solicitud = new SolicitudEvaluacion();
        solicitud.setCandidato(candidatoGuardado);
        solicitud.setResponsable(responsable);
        solicitud.setCargo(cargo.trim());
        solicitud.setFamiliaCargo(familiaCargo.trim());
        solicitud.setFechaSolicitud(LocalDate.now());
        solicitud.setEstado("Pendiente");
        solicitud.setObservaciones(observaciones);

        solicitudRepository.save(solicitud);

        return candidatoGuardado;
    }
}
