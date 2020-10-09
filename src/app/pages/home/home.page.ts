import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Categoria, GENERAL, TOOLBAR, BOTONES, ConfiguracionEmpresa, EVENTODISPONIBLE, EventoImagene } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { DataLocalService } from '../../services/data-local.service';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{
  eventos: EVENTODISPONIBLE[] = [];
  eventosConsultados: EVENTODISPONIBLE[] = [];
  imagenesSlide: EventoImagene[] = [];
  categorias: Categoria[] = [];
  promocion = [1, 2];
  verEventos = 6;
  textoBuscar: string;
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

  customPopoverOptions: any; /*= {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };*/

  constructor(private dataService: DataService,
              private dataLocal: DataLocalService,
              private modalService: ModalService,
              private activedRoute: ActivatedRoute) {
    this.getCargarEventos();
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloToolbar = resp.ESTILOS.TOOLBAR;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

  /*  this.dataService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });*/
  }

  ionViewWillEnter() {
    this.activedRoute.queryParams.subscribe(resp => {
      console.log(resp);
    });
  }

  ngAfterViewInit(){

  }

  getCargarEventos(){
    this.dataService.getEventosDisponibles()
                .then( (resp: EVENTODISPONIBLE[]) => {
                  this.eventosConsultados = resp;
                  this.verMasEventos();
                }). catch ( resp => {
                  this.modalService.showAlert('Algo salio mal', resp);
                });
  }

  verMasEventos(){
    for (let index = 0; index < this.verEventos; index++) {
      // this.eventosConsultados[index].eventoTipoEventoId = 1;
      this.eventos.unshift(this.eventosConsultados[index]);

      if (this.imagenesSlide.length < 5){
        this.imagenesSlide.push(this.eventosConsultados[index].eventoImagenes[0]);
      }
    }
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

  buscar(event) {
    const valor = event.detail.value;
    console.log(valor);
  }
}
