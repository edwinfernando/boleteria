import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Notificacion, GENERAL, BOTONES, Boleteria } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  @Output() ajustarToolbar = new EventEmitter<boolean>();
  lNotificacion: Notificacion [] = [
    {
      idTransferencia: 1,
      nombrePersonaEnvia: 'Jhony Velasco',
      notificacion: 'Jhony Velasco te ha solicitado una entrada',
      expanded: false,
      opened: false,
      solicitudTransferir: true,
      boleta: []
    },
    {
      idTransferencia: 2,
      nombrePersonaEnvia: 'Juan Esteban',
      notificacion: 'Juan Esteban Masmela te ha enviado una entrada',
      expanded: false,
      opened: false,
      solicitudTransferir: false,
      boleta: []
    },
    {
      idTransferencia: 3,
      nombrePersonaEnvia: 'Erika Inés Aguirre',
      notificacion: 'Erika Inés Aguirre te ha enviado una entrada',
      expanded: false,
      opened: true,
      solicitudTransferir: false,
      boleta: []
    }
  ];

  boleta: Boleteria = {
    nombre: 'Evento prueba',
    valor: 30000,
    eventoId: 1,
    eventoFechaInicio: '2020-11-30 03:00:00.0',
    eventoCiudad: 'MEDELLIN',
    eventoDepartamento: 'ANTIOQUIA',
    eventoEscenario: 'Pascualito',
    eventoDireccion: 'Calle 123, Falsa',
    eventoValorTransaccion: 1200,
    localidad: 'VIP',
    zonaId: 1,
    silla: '5',
    expanded: false
  };

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
  documento: string;
  etiquetaTitulo = 'Próximos eventos';
  lengthExpanded = false;

  constructor(private dataLocal: DataLocalService,
              private dataService: DataService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.ajustarToolbarEmitter(false);
  }

  async ngAfterViewInit() {
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.documento = resp.usuarioDocumento;
        // se habilita cuando este el servicio y se elima esto que solo para ejemplo
        this.lNotificacion[0].boleta.push(this.boleta);
        this.lNotificacion[0].boleta.push(this.boleta);
        this.lNotificacion[0].boleta.push(this.boleta);
       // this.consultarNotificaciones(); 
      }
    });
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

  async consultarNotificaciones(){
    // this.documento = '1212121221';
    const request = {
      strPeticion: JSON.stringify({
        documento: this.documento
      })};

    this.lNotificacion = [];

    await this.dataService.consultarNotificaciones(request)
      .then( (resp: Notificacion []) => {
        console.log(resp);
        this.lNotificacion = resp;
        this.lNotificacion.forEach( noti => {
          noti.expanded = false;
        });
        if (this.lNotificacion.length === 1){
          this.lengthExpanded = true;
        }
      }).catch( resp => {
      //  this.utilService.showAlert('Información', resp);
        this.etiquetaTitulo = resp;
      });
  }
}
