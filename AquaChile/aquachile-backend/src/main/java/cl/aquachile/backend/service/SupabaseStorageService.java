
package cl.aquachile.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestClientResponseException;

@Service
public class SupabaseStorageService {

    private final RestClient restClient;
    private final String supabaseUrl;
    private final String secretKey;

    public SupabaseStorageService(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.secret-key}") String secretKey) {

        this.supabaseUrl = supabaseUrl.replaceAll("/+$", "");
        this.secretKey = secretKey;

        this.restClient = RestClient.builder()
                .build();
    }

public String subirCv(Long idCandidato, String nombre, MultipartFile archivo) {
    return subirArchivo("candidatos", idCandidato, nombre, archivo);
}

public String subirCvPostulacion(Long idPostulacion, String nombre, MultipartFile archivo) {
    return subirArchivo("postulaciones", idPostulacion, nombre, archivo);
}

private String subirArchivo(
        String carpetaBase,
        Long id,
        String nombre,
        MultipartFile archivo) {

    if (archivo == null || archivo.isEmpty()) {
        throw new IllegalArgumentException("Debe adjuntar un CV.");
    }

    String contentType = archivo.getContentType();

    if (!"application/pdf".equalsIgnoreCase(contentType)
            && !"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            .equalsIgnoreCase(contentType)) {
        throw new IllegalArgumentException("Solo se permiten archivos PDF o DOCX.");
    }

    String extension = obtenerExtension(archivo.getOriginalFilename());

    String nombreCarpeta = nombre.trim()
            .replaceAll("[^a-zA-Z0-9]+", "_")
            .replaceAll("^_+|_+$", "")
            .toLowerCase();

    String nombreArchivo = "CV_" + nombreCarpeta + extension;

    String ruta = carpetaBase + "/" + id + "_" + nombreCarpeta
            + "/" + nombreArchivo;

    String rutaCodificada = URLEncoder
            .encode(ruta, StandardCharsets.UTF_8)
            .replace("+", "%20")
            .replace("%2F", "/");

    try {
        restClient.post()
                .uri(supabaseUrl + "/storage/v1/object/curriculums/" + rutaCodificada)
                .header("apikey", secretKey)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + secretKey)
                .header("x-upsert", "false")
                .contentType(MediaType.parseMediaType(contentType))
                .body(archivo.getBytes())
                .retrieve()
                .toBodilessEntity();

        return ruta;

    } catch (Exception e) {
        throw new RuntimeException(
                "No se pudo subir el CV a Supabase Storage: " + e.getMessage(), e);
    }
}
    
    public byte[] obtenerCv(String ruta) {

        if (ruta == null || ruta.isBlank()) {
            throw new IllegalArgumentException("El candidato no tiene un CV registrado.");
        }

        String rutaCodificada = URLEncoder
                .encode(ruta, StandardCharsets.UTF_8)
                .replace("+", "%20")
                .replace("%2F", "/");

        try {
            return restClient.get()
                    .uri(supabaseUrl + "/storage/v1/object/curriculums/" + rutaCodificada)
                    .header("apikey", secretKey)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + secretKey)
                    .retrieve()
                    .body(byte[].class);

        } catch (RestClientResponseException e) {
            throw new RuntimeException(
                    "No se pudo recuperar el CV desde Supabase: " + e.getStatusCode(), e);
        }
    }
    private String obtenerExtension(String nombreArchivo) {

        if (nombreArchivo == null || !nombreArchivo.contains(".")) {
            throw new IllegalArgumentException("El archivo no tiene una extensión válida.");
        }

        String extension = nombreArchivo.substring(
                nombreArchivo.lastIndexOf(".")).toLowerCase();

        if (!extension.equals(".pdf") && !extension.equals(".docx")) {
            throw new IllegalArgumentException("Extensión de archivo no permitida.");
        }

        return extension;
    }
}
