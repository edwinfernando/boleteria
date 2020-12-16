import { Component, OnInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GENERAL, EVENTOS, BOTONES, SLIDE, EVENTODISPONIBLE, LOCALIDAD, SILLETERIA, SILLAS, Boleteria, EventoImagenes, DETALLEUSUARIO } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { IonContent, IonSlides, NavController, PopoverController } from '@ionic/angular';
import { ModalService } from '../../services/modal.service';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { DataService } from '../../services/data.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { SilleteriaComponent } from '../../components/popovers/silleteria/silleteria.component';
import { LocalidadComponent } from '../../components/popovers/localidad/localidad.component';
import { CantidadComponent } from '../../components/popovers/cantidad/cantidad.component';
import { element } from 'protractor';
import { SplashService } from '../../services/splash.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  evento: EVENTODISPONIBLE = {
    eventoId: 0,
    eventoDescripcion: '',
    eventoImagenes: null,
    eventoDisponibilidad: '',
    patrocinadores: null,
    eventoCategoria: '',
    eventoDireccion: '',
    eventoFechaFinalVenta: '',
    eventoOrganizador: {
      nit: '',
      nombre: '',
      pagina: '',
      pulep: '',
      telefono: '',
    },
    restrinciones: [{
      nombre: '',
      estado: 0
    }],
    eventoNombre: '',
    eventoVideo: '',
    eventoCiudad: '',
    eventoEstado: '',
    eventoModalidadEvento: '',
    eventoModalidadEventoId: 0,
    eventoEscenario: '',
    eventoFechaInicialVenta: '',
    eventoFechaInicio: '',
    eventoPrecioBoleta: '',
    eventoHoraApertura: '',
    eventoFechaFin: '',
    eventoDepartamento: '',
    eventoTipoEventoId: 0,
    eventoValorTransaccion: 0
  };

  imagenesBanner: EventoImagenes[];
  imagenEscenario: EventoImagenes;
  imagenesEvento: EventoImagenes[];

  hoy: any;
  dias: any;
  horas: any;
  minutes: any;
  countdown = 60;
  timerHandler: number;
  url: any;
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;

  localidad: LOCALIDAD[];
  zona: any;
  zonaNombre = '';
  silleteria: SILLETERIA[];
  sillas: SILLAS[] = [];
  sillaTemp: SILLAS = {
    silla: null,
    selected: false
  };
  silla: any;
  numeroSillas: number;
  valor = '';
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    spaceBetween: 0,
    autoHeight: true,
    roundLengths: true,
    preloadImages: true,
    updateOnImagesReady: true,
    centeredSlides: true,
  };

  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };
  estiloEvento: EVENTOS = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT_TITULO: '',
    COLOR_TEXT_SUBTITULO: '',
    COLOR_TEXT_VALOR: '',
    COLOR_TEXT_DOLAR: '',
    COLOR_TEXT_DESCRIPCION: '',
    COLOR_TEXT_F_TIEMPO: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  estiloSlide: SLIDE = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT_TITULO: '',
    COLOR_TEXT_DESCRIPCION: ''
  };

  flatVideo = true;
  vidUrl: SafeResourceUrl;

  customPopoverOptions: any; /*= {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };*/

  @ViewChild('ionSlides') ionSlides: IonSlides;

  lBoleteria: Boleteria [] = [];

  constructor(private activeRouter: ActivatedRoute,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private modalService: ModalService,
              private utilService: UtilidadesService,
              private sanitizer: DomSanitizer,
              private navCtrl: NavController,
              private popoverController: PopoverController,
              private splasService: SplashService) {
    this.hoy = new Date();
    this.dataLocal.setPage('evento');
  }

  ngOnInit() {
    this.getInfoEvento();
    this.horas = 24 - this.hoy.getHours();
    this.minutes = this.hoy.getMinutes();
    this.startTimer();

    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloEvento = resp.ESTILOS.EVENTOS;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.estiloSlide = resp.ESTILOS.SLIDE;
      }
    });
  }

  getInfoEvento(){
    this.activeRouter.queryParams.subscribe( resp => {
      this.dataService.getEventoPorId(resp.evento.toString())
            .then( (respEvent: EVENTODISPONIBLE) => {
              this.splasService.dissmissSplash();
              this.evento = respEvent;
              const fechados = new Date(this.evento.eventoFechaInicio);
              const resultado = fechados.getTime() - this.hoy.getTime();
              this.dias = Math.floor(resultado / (1000 * 60 * 60 * 24 ));
              this.getLocalidadZona();

              this.imagenesBanner = this.evento.eventoImagenes.filter(ev => ev.tipoMultimediaId === 94);
              this.imagenEscenario = this.evento.eventoImagenes.find( ev => ev.tipoMultimediaId === 95);
              this.imagenesEvento = this.evento.eventoImagenes.filter(ev => ev.tipoMultimediaId === 96);

              if (this.evento.eventoVideo !== '') {
                this.getLinkVideo();
              }
            }).catch( respEvent => {
              this.splasService.dissmissSplash();
              this.utilService.showAlert('Algo salio mal', respEvent);
              this.navCtrl.pop();
            });
    });
  }

  ionViewWillEnter() {
    this.activeRouter.queryParams.subscribe( resp => {

      if (resp.isComprar !== undefined) {
        this.scrollTo('hear');
      }
    });

    this.toolbarComponent.getDetalleUsuario();
  }

  scrollTo(el: string) {
    const yOffset = document.getElementById(el).offsetTop;
    this.content.scrollByPoint(0, yOffset - 100, 2000);
  }

  next() {
    this.ionSlides.slideNext();
  }

  prev() {
    this.ionSlides.slidePrev();
  }

  openModalSolicitarEntrada() {
    this.dataLocal.getLogin().then(async resp => {
      if (resp !== false) {
        this.modalService.openModalSolicitar();
      } else {
        const result = await this.utilService.showAlertResult('Información', 'Para poder solicitar una entrada, debes iniciar sesión');

        if (result){
          this.toolbarComponent.openModalIniciarSesion();
        }
      }
    });
  }

  openModalRegistrarPin() {
    this.dataLocal.getLogin().then(async resp => {
      if (resp !== false) {
        this.modalService.openModalRegistrarPin();
      } else {
        const result = await this.utilService.showAlertResult('Información', 'Para poder registrar la entrada, debes iniciar sesión');

        if (result){
          this.toolbarComponent.openModalIniciarSesion();
        }
      }
    });
    
  }

  openModalEntrarEvento() {
    this.dataLocal.getLogin().then(async resp => {
      if (resp !== false) {
       // this.modalService.openModalRegistrarPin();
       this.utilService.showAlertResult('Información', 'Aún no esta habilitada esa sesión');
      } else {
        const result = await this.utilService.showAlertResult('Información', 'Para poder entrar al evento, debes iniciar sesión');

        if (result){
          this.toolbarComponent.openModalIniciarSesion();
        }
      }
    });
    
  }

  

  async openVerificarPedido(){
    this.ordenarBoleteria();
    const result = await this.modalService.openModalVerificarPedido(this.lBoleteria);

    if (result){
      this.toolbarComponent.getDetalleUsuario();
    }
  }

  /** Contador de tiempo para el evento */

  stop() {
    if (this.timerHandler) {
      window.clearInterval(this.timerHandler);
      this.timerHandler = 0;
    }
  }

  startTimer(){
    this.countdown = 60;
    this.stop();
    this.timerHandler = window.setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        this.minutes -= 1;

        if (this.minutes <= 0){
          this.minutes = 60;
          this.horas -= 1;
        }

        if (this.horas <= 0){
          this.dias -= -1;
          this.horas = 24;
        }

        this.stop();
        this.startTimer();
      }
    }, 1000);
  }

  getLinkVideo(){
    if (this.flatVideo){
      this.flatVideo = false;
     // this.url = '<iframe src="' + this.evento.eventoVideo + '" title="" allowfullscreen></iframe>';
      console.log(this.url);
    }

    let newURL = this.evento.eventoVideo;
    if (newURL.includes('&')){
      let newURLTemp = newURL.split('&');
      newURL = newURLTemp[0];
    }
    newURL = newURL.replace('watch?v=', 'embed/');
   // console.log(newURL);
   // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tgbNymZ7vqY');
    this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newURL);
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  getLocalidadZona(){
    this.dataService.getSilleteriaEventoPorId(this.evento.eventoId)
        .then( (resp: LOCALIDAD[]) => {
          this.localidad = resp;
          if (this.localidad.length === 1) {
            if (this.localidad[0].sectores.length === 1){
              this.zona = this.localidad[0].sectores[0];
              this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor);
              this.zonaNombre = this.zona.zonaNombre;
              this.getSilleteria();
            }
          }
        }).catch( resp => {
          this.utilService.showAlert('Algo salio mal', resp);
          this.navCtrl.pop();
        });
  }

  async seleccionarLocalidad(ev: any) {
    const popoverLocalidad = await this.popoverController.create({
      component: LocalidadComponent,
      componentProps: {
        localidad: this.localidad
      },
      cssClass: 'popover-class-localidad',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popoverLocalidad.present();
    const data  = await popoverLocalidad.onDidDismiss();
    if (data.data !== undefined){
      this.zona = data.data;
      this.zonaNombre = this.zona.zonaNombre;
      this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor);
      this.getSilleteria();
    } else{
      this.zona = [];
      this.zonaNombre = '';
    }
  }

  tieneSillas(){
    if (this.zonaNombre !== '') {
      if (this.sillas && this.sillas.length > 0){
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }

  getSilleteria(){
    this.sillas = [];
    this.numeroSillas = null;
    this.utilService.showLoading();

    this.dataService.getSilleteriaEventoPorEvento(this.evento.eventoId, this.zona.zonaId)
          .then( (resp: SILLETERIA[]) => {
            this.silleteria = resp;
           // console.log(this.silleteria);
            this.silleteria.forEach( silla => {
              this.sillaTemp = {
                silla: null,
                selected: false
              };
              this.sillaTemp.silla = silla;
              this.sillas.push(this.sillaTemp);
            });

            console.log(this.sillas);
            if (this.sillas.length === 0) {
                this.numeroSillas = 1;
            }
            this.utilService.dissmisLoading();
           // console.log(this.sillas);
          }).catch( resp => {
            this.utilService.dissmisLoading();
            this.utilService.showAlert('Algo salio mal', resp);
          });
  }

  async seleccionarSilleteria(ev: any) {
    const popoverSilleteria = await this.popoverController.create({
      component: SilleteriaComponent,
      componentProps: {
        sillas: this.sillas
      },
      cssClass: 'popover-class-silleteria',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popoverSilleteria.present();
    const data  = await popoverSilleteria.onDidDismiss();
    if (data.data !== undefined){

      this.sillas = data.data;

      this.numeroSillas = 0;
      this.sillas.forEach( silla => {
        if (silla.selected) {
          this.numeroSillas += 1;
        }
      });
      if (this.numeroSillas > 0){
        this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor * this.numeroSillas);
      } else {
        this.numeroSillas = null;
        this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor);
      }

    } else{
      this.silla = [];
     // this.nombreSilla = '';
    }
  }

  async seleccionarCantidad(ev: any) {
    const popoverSilleteria = await this.popoverController.create({
      component: CantidadComponent,
      componentProps: {
        // sillas: this.sillas
      },
     // cssClass: 'popover-class-silleteria',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popoverSilleteria.present();
    const data  = await popoverSilleteria.onDidDismiss();
    if (data.data !== undefined){
      this.numeroSillas = data.data;
      this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor * this.numeroSillas);
    } else{
      // this.silla = [];
      this.numeroSillas = null;
      this.valor = this.utilService.formatearNumeroMonedaDecimas(this.zona.zonaValor);
    }
  }

  ordenarBoleteria(){
    let sillasTemp: SILLAS[] = [];
    if (this.sillas.length > 0){
      sillasTemp = this.sillas.filter( silla => silla.selected);
    }

    this.lBoleteria = [];

    for (let index = 0; index < this.numeroSillas; index++) {
      let silla = '';
      if (sillasTemp.length > 0){
        silla = sillasTemp[index].silla.silleteriaNombre;
      }
      const boleta: Boleteria = {
        nombre: this.evento.eventoNombre,
        valor: this.zona.zonaValor,
        eventoFechaInicio: this.evento.eventoFechaInicio,
        eventoCiudad: this.evento.eventoCiudad,
        eventoDepartamento: this.evento.eventoDepartamento,
        eventoEscenario: this.evento.eventoEscenario,
        eventoDireccion: this.evento.eventoDireccion,
        eventoId: this.evento.eventoId,
        localidad: this.zona.zonaNombre,
        eventoValorTransaccion: this.evento.eventoValorTransaccion,
        zonaId: this.zona.zonaId,
        silla,
        expanded: false
      };
      this.lBoleteria.push(boleta);
    }
  }
}
