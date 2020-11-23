import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { GENERAL, Boleteria, BOTONES } from '../../interfaces/interfaces';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.page.html',
  styleUrls: ['./mis-eventos.page.scss'],
})
export class MisEventosPage implements OnInit {

  @Output() ajustarToolbar = new EventEmitter<boolean>();
  lBoleteria: Boleteria [] = [
    {
      nombre: 'Evento prueba',
      valor: 30000,
      eventoFechaInicio: '2020-11-30 03:00:00.0',
      eventoCiudad: 'MEDELLIN',
      eventoDepartamento: 'ANTIOQUIA',
      eventoEscenario: 'Pascualito',
      eventoDireccion: 'Calle 123, Falsa',
      localidad: 'VIP',
      silla: '5',
      expanded: false
    },
    {
      nombre: 'Evento prueba',
      valor: 30000,
      eventoFechaInicio: '2020-11-30 03:00:00.0',
      eventoCiudad: 'MEDELLIN',
      eventoDepartamento: 'ANTIOQUIA',
      eventoEscenario: 'Pascualito',
      eventoDireccion: 'Calle 123, Falsa',
      localidad: 'VIP',
      silla: '5',
      expanded: false
    }
  ];
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
  constructor(private dataLocal: DataLocalService,
              private modalService: ModalService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.ajustarToolbarEmitter(false);
  }

  onClickEvento(boleteria: Boleteria){
    boleteria.expanded =  !boleteria.expanded;
    this.ajustarToolbarEmitter(true);
  }

  verMasEventos(){
    for (let index = 0; index < 5; index++) {
      this.lBoleteria.unshift({
        nombre: 'Evento prueba',
        valor: 30000,
        eventoFechaInicio: '2020-11-30 03:00:00.0',
        eventoCiudad: 'MEDELLIN',
        eventoDepartamento: 'ANTIOQUIA',
        eventoEscenario: 'Pascualito',
        eventoDireccion: 'Calle 123, Falsa',
        localidad: 'VIP',
        silla: '5',
        expanded: false
      });
    }

    this.ajustarToolbarEmitter(true);
  }

  openModalTransferir(){
    this.modalService.openModalTransferir();
  }

  ajustarToolbarEmitter(ajustar: boolean) {
    if (this.lBoleteria.length >= 2 ){
      this.ajustarToolbar.emit(ajustar);
    }
  }
}
