import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GENERAL, EVENTOS, BOTONES, SLIDE, EVENTODISPONIBLE } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { IonContent, IonSlides } from '@ionic/angular';
import { ModalService } from '../../services/modal.service';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  evento: EVENTODISPONIBLE;
  hoy: any;
  dias: any;
  horas: any;
  minutes: any;
  countdown = 60;
  timerHandler: number;
  url = 'https://vjs.zencdn.net/v/oceans.mp4';
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;
  @ViewChild(IonContent, { static: false }) content: IonContent;
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

  customPopoverOptions: any; /*= {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };*/

  @ViewChild('ionSlides') ionSlides: IonSlides;

  constructor(private activeRouter: ActivatedRoute,
              private dataLocal: DataLocalService,
              private modalService: ModalService,
              private route: Router,
              private videoPlayer: VideoPlayer,
              public sanitizer: DomSanitizer) {
    this.hoy = new Date();
  }

  ngOnInit() {
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

    this.activeRouter.queryParams.subscribe( resp => {
      this.evento = JSON.parse(resp.evento);

      const fechados = new Date(this.evento.eventoFechaInicio);
      const resultado = fechados.getTime() - this.hoy.getTime();
      this.dias = Math.floor(resultado / (1000 * 60 * 60 * 24 ));
    });
  }

  ionViewWillEnter() {
   this.activeRouter.queryParams.subscribe( resp => {

      if (resp.isComprar !== undefined) {
        this.scrollTo('hear');
      }
    });
  }

  scrollTo(element: string) {
    const yOffset = document.getElementById(element).offsetTop;
    this.content.scrollByPoint(0, yOffset - 50, 1000);
  }

  next() {
    this.ionSlides.slideNext();
  }

  prev() {
    this.ionSlides.slidePrev();
  }

  openModalSolicitarEntrada() {
    this.modalService.openModalSolicitar();
  }

  openVerificarPedido(){
    this.route.navigate(['verificar-pedido'], {
      queryParams: {
        evento: JSON.stringify(this.evento)
      }
    });
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

  getLink(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
}
