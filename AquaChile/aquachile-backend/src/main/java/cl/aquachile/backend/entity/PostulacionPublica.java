package cl.aquachile.backend.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "postulacion_publica")
public class PostulacionPublica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_postulacion")
    private Long idPostulacion;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "correo", nullable = false, length = 150)
    private String correo;

    @Column(name = "telefono", length = 30)
    private String telefono;

    @Column(name = "familia_cargo", nullable = false, length = 120)
    private String familiaCargo;

    @Column(name = "cargo", nullable = false, length = 150)
    private String cargo;

    @Column(name = "cv_path", length = 500)
    private String cvPath;

    @Column(name = "fecha_postulacion", nullable = false)
    private OffsetDateTime fechaPostulacion;

    @Column(name = "estado", nullable = false, length = 30)
    private String estado;

    @Column(name = "observaciones_revision")
    private String observacionesRevision;

    @Column(name = "id_responsable_revision")
    private Long idResponsableRevision;

    @Column(name = "fecha_revision")
    private OffsetDateTime fechaRevision;

    @Column(name = "id_candidato")
    private Long idCandidato;

    public PostulacionPublica() {
    }

    public Long getIdPostulacion() {
        return idPostulacion;
    }

    public void setIdPostulacion(Long idPostulacion) {
        this.idPostulacion = idPostulacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFamiliaCargo() {
        return familiaCargo;
    }

    public void setFamiliaCargo(String familiaCargo) {
        this.familiaCargo = familiaCargo;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCvPath() {
        return cvPath;
    }

    public void setCvPath(String cvPath) {
        this.cvPath = cvPath;
    }

    public OffsetDateTime getFechaPostulacion() {
        return fechaPostulacion;
    }

    public void setFechaPostulacion(OffsetDateTime fechaPostulacion) {
        this.fechaPostulacion = fechaPostulacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservacionesRevision() {
        return observacionesRevision;
    }

    public void setObservacionesRevision(String observacionesRevision) {
        this.observacionesRevision = observacionesRevision;
    }

    public Long getIdResponsableRevision() {
        return idResponsableRevision;
    }

    public void setIdResponsableRevision(Long idResponsableRevision) {
        this.idResponsableRevision = idResponsableRevision;
    }

    public OffsetDateTime getFechaRevision() {
        return fechaRevision;
    }

    public void setFechaRevision(OffsetDateTime fechaRevision) {
        this.fechaRevision = fechaRevision;
    }

    public Long getIdCandidato() {
        return idCandidato;
    }

    public void setIdCandidato(Long idCandidato) {
        this.idCandidato = idCandidato;
    }
}
