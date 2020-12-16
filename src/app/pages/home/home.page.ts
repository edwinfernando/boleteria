import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria, GENERAL, TOOLBAR, BOTONES, EVENTODISPONIBLE, EventoImagenes, CATEGORIAS, CIUDADES, SOLICITUDEVENTO } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { DataLocalService } from '../../services/data-local.service';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonDatetime, IonSelect } from '@ionic/angular';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  eventos: EVENTODISPONIBLE[] = [];
  eventosConsultados: EVENTODISPONIBLE[] = [];
  listCategorias: CATEGORIAS[] = [];
  listCiudades: CIUDADES[] = [];
  imagenesSlide: EventoImagenes[] = [];
  categorias: Categoria[] = [];
  promocion = [1, 2];
  verEventos = 6;
  textoBuscar: string = null;
  isLogueado = false;
  @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;
  @ViewChild('categoria') categoriaSelect: IonSelect;
  @ViewChild('ciudad') ciudadSelect: IonSelect;
  @ViewChild('fecha') fechaFiltro: IonDatetime;
  meses = 'ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic';
  customPickerOptions: any;
  fecha: string = null;
  fechaMinima: string;

  idCategoria: string = null;
  idCiudad: string = null;

  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };

  estiloToolbar: TOOLBAR = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT: '',
    COLOR_BACKGROUND_SEARCH: '',
    COLOR_TEXT_SEARCH: ''
  };

  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };

  listEventosSolicitud: SOLICITUDEVENTO[] = [];

  constructor(private dataService: DataService,
              private dataLocal: DataLocalService,
              private modalService: ModalService,
              private utilService: UtilidadesService,
              private activedRoute: ActivatedRoute,
              private router: Router) {
    this.getFechaMinima();
    this.getFiltrosEventos();
    this.getCargarEventos();
    this.dataLocal.setPage('home');

    this.customPickerOptions = {
      cssClass: 'datetime-class'
    };
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloToolbar = resp.ESTILOS.TOOLBAR;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

  }

  ionViewWillEnter() {
    this.toolbarComponent.getDetalleUsuario();
  }

  getFechaMinima(){
    const hoy = new Date();
    const ano = hoy.getFullYear().toString();
    let mes = (hoy.getMonth() + 1).toString();
    let dia = hoy.getDay().toString();

    if (mes.length === 1){
      mes = '0' + mes;
    }
    if (dia.length === 1){
      dia = '0' + dia;
    }

    this.fechaMinima = ano + '-' + mes + '-' + dia;
  }

  getFiltrosEventos(){
    this.dataService.getCategoriasEventos()
                .then( (resp: CATEGORIAS[]) => {
                  this.listCategorias = resp;
                }).catch( resp => {
                  this.utilService.showAlert('Algo salio mal', resp);
                });

    this.dataService.getCiudadesEventosDisponibles()
                .then( (resp: CIUDADES[]) => {
                  this.listCiudades = resp;
                }).catch( resp => {
                  this.utilService.showAlert('Algo salio mal', resp);
                });
  }

  filtrarEvento(){
    this.dataService.getEventosFiltro(this.textoBuscar, this.fecha, this.idCategoria, this.idCiudad)
                .then( (resp: EVENTODISPONIBLE[]) => {
                  this.eventos = resp;
                  console.log(resp);
              //    this.eventosConsultados = resp;
              //    this.verMasEventos();
                }). catch ( resp => {
                  this.utilService.showAlert('', resp);
                  this.limpiarFiltro();
                });
  }

  getCargarEventos(){
    this.dataService.getEventosDisponibles()
                .then( (resp: EVENTODISPONIBLE[]) => {
                  this.eventosConsultados = resp;
                  console.log(this.eventosConsultados);
                  this.verMasEventos();
                }). catch ( resp => {
                  this.utilService.showAlert('Algo salio mal', resp);
                });
  }

  verMasEventos(){
    this.verEventos = this.eventosConsultados.length;
    for (let index = 0; index < this.verEventos; index++) {
      // this.eventosConsultados[index].eventoTipoEventoId = 1;
      this.eventos.unshift(this.eventosConsultados[index]);

      if (this.imagenesSlide.length < 5){
        this.imagenesSlide.push(this.eventosConsultados[index].eventoImagenes[0]);
      }

      this.setEventosSolicitud(this.eventosConsultados[index]);
    }
  }

  setEventosSolicitud(evento: EVENTODISPONIBLE){
    const ev: SOLICITUDEVENTO = {
      codigo: evento.eventoId,
      nombreEvento: evento.eventoNombre
    }

    this.listEventosSolicitud.unshift(ev);
    this.dataLocal.setEventosSolicitud(this.listEventosSolicitud);
  }

  sizeEventoLg(tipo: number){
    if (tipo === 1){
      return 4;
    }else {
      return 8;
    }
  }

  sizeEvento(tipo: number){
      if (tipo === 1){
        return 6;
      }else {
        return 12;
      }
  }

  buscarPorNombre(event) {
    if (event.detail.value !== ''){
      this.textoBuscar = event.detail.value;
      this.filtrarEvento();
    }else {
      if (this.textoBuscar !== null || this.textoBuscar !== ''){
        this.getCargarEventos();
        this.textoBuscar = null;
      }
    }
  }

  buscarPorCategoria(event) {
    if (event.detail.value !== ''){
      this.idCategoria = event.detail.value + '';
      this.filtrarEvento();
    }
  }

  buscarPorCiudad(event) {
    if (event.detail.value !== ''){
      this.idCiudad = event.detail.value;
      this.filtrarEvento();
    }
  }

  buscarPorFecha(event) {
    if (event.detail.value !== ''){
      this.fecha = event.detail.value;
      this.filtrarEvento();
    }
  }

  mostrarLimpiar() {
    if (this.textoBuscar !== null || this.fecha !== null || this.idCategoria !== null || this.idCiudad !== null){
      return true;
    } else {
      return false;
    }
  }

  mostrarLimpiarSize() {
    if (this.textoBuscar !== null || this.fecha !== null || this.idCategoria !== null || this.idCiudad !== null){
      return 5;
    } else {
      return 6;
    }
  }

  mostrarLimpiarSizeM() {
    if (this.textoBuscar !== null || this.fecha !== null || this.idCategoria !== null || this.idCiudad !== null){
      return 11;
    } else {
      return 12;
    }
  }

  limpiarFiltro(){
    this.textoBuscar = null;
    this.fecha = null;
    this.idCategoria = null;
    this.idCiudad = null;

    this.categoriaSelect.value = '';
    this.ciudadSelect.value = '';
    this.fechaFiltro.value = '';
    this.eventos = [];
    this.eventosConsultados = [];
    this.getCargarEventos();
  }

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.isLogueado = true;
      } else {
        this.isLogueado = false;
      }
    });
  }

}
