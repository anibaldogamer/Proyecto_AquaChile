package cl.aquachile.backend.service;

import cl.aquachile.backend.entity.PostulacionPublica;
import cl.aquachile.backend.repository.PostulacionPublicaRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;

@Service
public class PostulacionPublicaService {

    private final PostulacionPublicaRepository postulacionRepository;
    private final SupabaseStorageService storageService;

    
    public PostulacionPublicaService(
            PostulacionPublicaRepository postulacionRepository,
            SupabaseStorageService storageService) {

        this.postulacionRepository = postulacionRepository;
        this.storageService = storageService;
    }

    public long contarTodas() {
        return postulacionRepository.count();
    }

    public long contarPendientes() {
        return postulacionRepository.countByEstado("PENDIENTE");
    }
    @Transactional
    public PostulacionPublica registrarPostulacion(
            String nombre,
            String correo,
            String telefono,
            String familiaCargo,
            String cargo,
            MultipartFile cvFile) {

        if (nombre == null || nombre.isBlank()
                || correo == null || correo.isBlank()
                || familiaCargo == null || familiaCargo.isBlank()
                || cargo == null || cargo.isBlank()) {
            throw new IllegalArgumentException(
                    "Debe completar todos los campos obligatorios.");
        }

        PostulacionPublica postulacion = new PostulacionPublica();

        postulacion.setNombre(nombre.trim());
        postulacion.setCorreo(correo.trim());
        postulacion.setTelefono(
                telefono == null ? null : telefono.trim());
        postulacion.setFamiliaCargo(familiaCargo.trim());
        postulacion.setCargo(cargo.trim());
        postulacion.setEstado("PENDIENTE");
        postulacion.setFechaPostulacion(OffsetDateTime.now());

        PostulacionPublica postulacionGuardada =
                postulacionRepository.save(postulacion);

        String rutaCv = storageService.subirCvPostulacion(
                postulacionGuardada.getIdPostulacion(),
                postulacionGuardada.getNombre(),
                cvFile
        );

        postulacionGuardada.setCvPath(rutaCv);

        return postulacionRepository.save(postulacionGuardada);
    
    }


}
