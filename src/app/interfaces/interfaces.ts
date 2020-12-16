export interface Slide {
    image: string;
    title: string;
    subtitle: string;
    type: number;
  }

export interface Categoria {
    id: string;
    image: string;
    nameCategory: string;
    description: string;
  }

export interface Pais {
    id: string;
    name: string;
    code: string;
    image: string;
    listCiudad: Ciudad[];
    isChecked: boolean;
    expanded: boolean;
  }

export interface Ciudad {
  id: string;
  name: string;
  code: string;
}

export interface Menu {
    icon: string;
    name: string;
    redirecTo: string;
  }


export interface Boleteria {
  nombre: string;
  valor: number;
  eventoId: number;
  eventoFechaInicio: string;
  eventoCiudad: string;
  eventoDepartamento: string;
  eventoEscenario: string;
  eventoDireccion: string;
  eventoValorTransaccion: number;
  localidad: string;
  zonaId: number;
  silla: string;
  expanded: boolean;
}

export interface Notificacion {
  idTransferencia: number;
  nombrePersonaEnvia: string;
  notificacion: string;
  boleta: Boleteria;
  solicitudTransferir: boolean;
  expanded: boolean;
  opened: boolean;
}

/** CONSULTAR Y RESPUESTAS DEL SERVIDOR * */

export interface RespuestaServidor {
  codigoRespuesta: string;
  mensajeRespuesta: string;
  respuesta: any;
}

/** Configurar colores */

export interface ConfiguracionEmpresa {
  VERSION: string;
  MARCA: string;
  IMAGEN: string;
  ESTILOS: ESTILOS;
  TITULOCORREO: string;
  CONTENIDOCORREO: string;
  TITUTLOPOLITICA: string;
  CONTENIDOPOLITICA: string;
  TITULOTERMINOS: string;
  CONTENIDOTERMINOS: string;
}

export interface EMPRESA {
  nombreEmpresa: string;
  nitEmpresa: string;
  estadoEmpresa: string;
  correoEmpresa: string;
  telefonoEmpresa: string;
  direccionEmpresa: string;
}

export interface ESTILOS {
  GENERAL: GENERAL;
  TOOLBAR: TOOLBAR;
  SLIDE: SLIDE;
  EVENTOS: EVENTOS;
  BOTONES: BOTONES;
  FOOTER: FOOTER;
}

export interface FOOTER {
  COLOR_BACKGROUND: string;
  COLOR_TEXT_TITULO: string;
  COLOR_TEXT_CONTENIDO: string;
}

export interface BOTONES {
  COLOR_BACKGROUND_B_ACCESO: string;
  COLOR_BACKGROUND_B_PIN: string;
  COLOR_BACKGROUND_B_COMPARTIR: string;
  COLOR_TEXT: string;
}

export interface EVENTOS {
  COLOR_BACKGROUND: string;
  COLOR_TEXT_TITULO: string;
  COLOR_TEXT_SUBTITULO: string;
  COLOR_TEXT_VALOR: string;
  COLOR_TEXT_DOLAR: string;
  COLOR_TEXT_DESCRIPCION: string;
  COLOR_TEXT_F_TIEMPO: string;
}

export interface SLIDE {
  COLOR_BACKGROUND: string;
  COLOR_TEXT_TITULO: string;
  COLOR_TEXT_DESCRIPCION: string;
}

export interface TOOLBAR {
  COLOR_BACKGROUND: string;
  COLOR_TEXT: string;
  COLOR_BACKGROUND_SEARCH: string;
  COLOR_TEXT_SEARCH: string;
}

export interface GENERAL {
  COLOR_BACKGROUND_GENERAL: string;
  COLOR_BACKGROUND_SLIDES: string;
  COLOR_BACKGROUND_EVENTOS: string;
  COLOR_BACKGROUND_CATEGORIAS: string;
  COLOR_TEXT: string;
}

/** Tipo documento */

export interface TIPODOCUMENTO {
  codigo: string;
  nombreTipoDcoumento: string;
}

/** TIPO EVENTO */

export interface EVENTODISPONIBLE {
  eventoId: number;
  eventoDescripcion: string;
  eventoImagenes: EventoImagenes[];
  eventoDisponibilidad: string;
  patrocinadores: Patrocinadores[];
  eventoCategoria: string;
  eventoDireccion: string;
  eventoFechaFinalVenta: string;
  eventoOrganizador: EventoOrganizador;
  restrinciones: Restrinciones[];
  eventoNombre: string;
  eventoVideo: string;
  eventoCiudad: string;
  eventoEstado: string;
  eventoModalidadEvento: string;
  eventoModalidadEventoId: number;
  eventoEscenario: string;
  eventoFechaInicialVenta: string;
  eventoFechaInicio: string;
  eventoPrecioBoleta: string;
  eventoHoraApertura: string;
  eventoFechaFin: string;
  eventoDepartamento: string;
  eventoTipoEventoId: number;
  eventoValorTransaccion: number;
}

export interface Restrinciones {
  estado: number;
  nombre: string;
}

export interface Parrafo {
  descripcion: string;
  orden: number;
}

export interface Patrocinadores {
  pagina: string;
  imagen: string;
  imagenPatrocinador: string;
  nombre: string;
}

export interface EventoImagenes {
  fecha: string;
  nombre: string;
  tipoMultimedia: string;
  tipoMultimediaId: number;
  url: string;
}

export interface EventoOrganizador {
  nit: string;
  nombre: string;
  pagina: string;
  pulep: string;
  telefono: string;
}

/** Detalle usuario */
export interface DETALLEUSUARIO{
  idUsuario: string;
  usuarioNombreLogin: string;
  usuarioNombrePersona: string;
  usuarioEmail: string;
  usuarioCelular: string;
  usuarioDocumento: string;
  usuarioIniciales: string;
}

export interface USUARIO{
  documento: string;
  tipoDocumento: TIPODOCUMENTO;
  primerNombre: string;
  segundoNombre: string;
  apellidoUno: string;
  apellidoDos: string;
  celular: string;
  correo: string;
  telefono: string;
  idPersona: string;
  fechaNacimiento: string;
}

/** FILTRO EVENTOS */
export interface CIUDADES{
  codigo: string;
  codigoDepartamento: string;
  nombreDepartamento: string;
  nombreCiudad: string;
}

export interface CATEGORIAS{
  idCategoria: string;
  nombreCategoria: string;
  listCategoriaHijas: CATEGORIAS[];
}

/** SILLETERIA */

export interface LOCALIDAD {
  zonaId: number;
  zonaNombre: string;
  sectores: Sectore[];
  expanded: boolean;
}

export interface Sectore {
  zonaId: number;
  zonaNombre: string;
  zonaValor: number;
  tieneSillteria: boolean;
}

export interface SILLETERIA{
  silleteriaColumna: number;
  silleteriaEscenario: number;
  silleteriaEstado: number;
  silleteriaFila: number;
  silleteriaId: number;
  silleteriaNombre: string;
  silleteriaZona: number;
}

export interface SILLAS {
  silla: SILLETERIA;
  selected: boolean;
}

/** COMPRA */
export interface COMPRA {
  zonaId: number;
  cantidad: number;
}

/** Tipo queja solictud */

export interface TIPOQUEJASOLICITUD {
  codigo: string;
  nombreTipo: string;
  tipoSolicitud: TIPOQUEJASOLICITUD[]
}

export interface SOLICITUDEVENTO{
  codigo: number;
  nombreEvento: string;
}
