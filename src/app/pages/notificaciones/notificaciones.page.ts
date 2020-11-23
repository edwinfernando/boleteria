import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Notificacion, GENERAL, BOTONES } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  @Output() ajustarToolbar = new EventEmitter<boolean>();
  lNotificacion: Notificacion [] = [
    {
      nombre: 'Jhony Velasco',
      valor: '$200.000',
      notificacion: 'Jhony Velasco te ha solicitado una entrada',
      expanded: false,
      evento: 'Concierto 1',
      opened: false,
      transferible: true,
      received: false
    },
    {
      nombre: 'Juan Esteban',
      valor: '$200.000',
      notificacion: 'Juan Esteban Masmela te ha enviado una entrada',
      expanded: false,
      evento: 'Concierto 2',
      opened: false,
      transferible: false,
      received: true
    },
    {
      nombre: 'Sebastian Suaza',
      valor: '$200.000',
      notificacion: 'Sebastian Suaza te ha enviado una entrada',
      expanded: false,
      evento: 'Concierto 2',
      opened: true,
      transferible: true,
      received: false
    },
    {
      nombre: 'Erika Inés Aguirre',
      valor: '$200.000',
      notificacion: 'Erika Inés Aguirre te ha enviado una entrada',
      expanded: false,
      evento: 'Concierto 4',
      opened: true,
      transferible: false,
      received: true
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
  constructor(private dataLocal: DataLocalService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.ajustarToolbarEmitter(false);
  }

  onClickNotificacion(notificacion: Notificacion){
    notificacion.expanded =  !notificacion.expanded;

    if (!notificacion.opened) {
      notificacion.opened = !notificacion.opened;
    }

    this.ajustarToolbarEmitter(true);
  }

  ajustarToolbarEmitter(ajustar: boolean) {
    if (this.lNotificacion.length >= 2 ){
      this.ajustarToolbar.emit(ajustar);
    }
  }
}
