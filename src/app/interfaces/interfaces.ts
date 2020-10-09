export interface Slide {
    image: string;
    title: string;
    subtitle: string;
    type: number;
  }

export interface Evento {
  id: string;
  image: string[];
  nameEvent: string;
  description: string;
  price: string;
  dollars: string;
  date: string;
  favorite: number;
  gInformation: InformacionGeneral[];
  lExperences: Experiencia[];
  tipo: number;
  isVirtual: boolean;
  isAgotado: boolean;
}

export interface InformacionGeneral {
  icon: string;
  title: string;
  description: string;
}

export interface Experiencia {
  title: string;
  lDescriptions: string[];
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
  name: string;
  expanded: boolean;
}

export interface Notificacion {
  notificacion: string;
  expanded: boolean;
  opened: boolean;
  transferible: boolean;
  received: boolean;
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
  eventoEscenario: string;
  eventoId: number;
  eventoDescripcion: string;
  eventoImagenes: EventoImagene[];
  eventoFechaInicialVenta: string;
  eventoFechaInicio: string;
  eventoPrecioBoleta: string;
  eventoHoraApertura: string;
  eventoDisponibilidad: string;
  eventoTipoEvento: string;
  eventoCategoria: string;
  eventoDireccion: string;
  eventoInformacionGeneral: EventoInformacionGeneral;
  eventoFechaFin: string;
  eventoEsAforoDisponible: number;
  eventoFechaFinalVenta: string;
  eventoOrganizador: string;
  eventoNombre: string;
  eventoVideo: string;
  eventoCiudad: string;
  eventoEstado: string;
  eventoAnuncio: string;
  eventoDepartamento: string;
  eventoTipoEventoId: number;
}

export interface EventoInformacionGeneral {
  numeroParrafos: string;
  parrafos: Parrafo[];
}

export interface Parrafo {
  descripcion: string;
  orden: number;
}

export interface EventoImagene {
  fecha: string;
  nombre: string;
  url: string;
}

/** Detalle usuario */
export interface DETALLEUSUARIO{
  usuarioNombreLogin: string;
  usuarioNombrePersona: string;
  usuarioEmail: string;
  usuarioCelular: string;
  usuarioIniciales: string;
}
