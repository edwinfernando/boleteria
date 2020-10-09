import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Slide, SLIDE, GENERAL, BOTONES, EventoImagene } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { DataService } from '../../services/data.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

 // @Input() slide: Slide;
  slides: Slide[] = [];
  @Input() imagenesSlide: EventoImagene[] = [];
  @ViewChild('ionSlides') ionSlides: IonSlides;

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

  estiloSlide: SLIDE = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT_TITULO: '',
    COLOR_TEXT_DESCRIPCION: ''
  };

  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };

  constructor(private dataLocal: DataLocalService,
              private dataService: DataService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloSlide = resp.ESTILOS.SLIDE;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.dataService.getSlides().subscribe( resp => {
      this.slides = resp;
    });
  }

  next() {
    this.ionSlides.slideNext();
  }

  prev() {
    this.ionSlides.slidePrev();
  }

}
