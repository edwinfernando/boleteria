import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { GENERAL, Boleteria, BOTONES } from '../../interfaces/interfaces';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { UtilidadesService } from '../../services/utilidades.service';


@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.page.html',
  styleUrls: ['./mis-eventos.page.scss'],
})
export class MisEventosPage implements OnInit, AfterViewInit {

  @Output() ajustarToolbar = new EventEmitter<boolean>();
  etiquetaTitulo = 'Próximos eventos';
  documento: string;
  lBoleteria: Boleteria [];
  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  lengthExpanded = false;
  constructor(private dataLocal: DataLocalService,
              private dataService: DataService,
              private modalService: ModalService,
              private utilService: UtilidadesService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    // this.ajustarToolbarEmitter(false);
  }

  async ngAfterViewInit() {
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.documento = resp.usuarioDocumento;
        this.consultarBoleteria();
      }
    });
  }

  onClickEvento(boleteria: Boleteria){
    boleteria.expanded =  !boleteria.expanded;
   // this.ajustarToolbarEmitter(true);
  }

  verMasEventos(){
    for (let index = 0; index < 5; index++) {
    }

  //  this.ajustarToolbarEmitter(true);
  }

  openModalTransferir(boleteria: Boleteria){
    this.modalService.openModalTransferir(boleteria);
  }

  ajustarToolbarEmitter(ajustar: boolean) {
    if (this.lBoleteria.length >= 2 ){
      this.ajustarToolbar.emit(ajustar);
    }
  }

  async consultarBoleteria(){
    // this.documento = '1212121221';
    const request = {
      strPeticion: JSON.stringify({
        documento: this.documento
      })};

    this.lBoleteria = [];

    await this.dataService.consultarBoleteria(request)
      .then( (resp: Boleteria []) => {
        console.log(resp);
        this.lBoleteria = resp;
        this.lBoleteria.forEach( bole => {
          bole.expanded = false;
        });
        if (this.lBoleteria.length === 1){
          this.lengthExpanded = true;
        }
      }).catch( resp => {
      //  this.utilService.showAlert('Información', resp);
        this.etiquetaTitulo = resp;
      });
  }

  formatearValor(valor: any){
   return this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
