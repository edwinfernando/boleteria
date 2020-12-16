import { Component, OnInit } from '@angular/core';
import { GENERAL, SLIDE, Categoria, NOSOTROS } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { DataService } from '../../services/data.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UtilidadesService } from '../../services/utilidades.service';
import { SplashService } from '../../services/splash.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  objetoNosotros: NOSOTROS = {
    imagenBanner: 'https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    nosotros: "At Ticketmaster, we strive to put fans first. Every day we're liste- ning to your feedback and working to improve your experience before, during, and after events. In 2010, Ticketmaster and Live Nation merged to create Live Nation Entertainment. Now you have more options than ever to enjoy live events, and things are only ge- tting better. We're making real changes and putting you first in everything we do. Here's just a taste of what we're up to... At Tic- ketmaster, we strive to put fans first. Every day we're listening to your feedback and working to improve your experience before, during, and after events. In 2010, Ticketmaster and Live Nation merged to create Live Nation Entertainment.",
    imagenNosotros: 'https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    etiquetaImagenNosotros: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam no- nummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    videoNosotros: 'https://www.youtube.com/watch?v=FRhRBVKRIBQ&ab_channel=BayerGlobal',
    imagenQuienSomos: 'https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    quienSomos: "At Ticketmaster, we strive to put fans first. Every day we're liste- ning to your feedback and working to improve your experience before, during, and after events. In 2010, Ticketmaster and Live Nation merged to create Live Nation Entertainment. Now you have more options than ever to enjoy live events, and things are only ge- tting better. We're making real changes and putting you first in everything we do. Here's just a taste of what we're up to... At Tic- ketmaster, we strive to put fans first. Every day we're listening to your feedback and working to improve your experience before, during, and after events. In 2010, Ticketmaster and Live Nation merged to create Live Nation Entertainment.",
    patrocinadores: [{
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
      imagenPatrocinador: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
      nombre: "APPLE",
      pagina: "www.patrocinador_tres.com"
    },
    {
      imagen: "https://e7.pngegg.com/pngimages/1012/383/png-clipart-fizzy-drinks-pepsi-postobon-colombia-logo-pepsi-love-text.png",
      imagenPatrocinador: "https://e7.pngegg.com/pngimages/1012/383/png-clipart-fizzy-drinks-pepsi-postobon-colombia-logo-pepsi-love-text.png",
      nombre: "SAMSUNG",
      pagina: "http://prueba.com"
    }]
  };

  vidUrl: SafeResourceUrl;

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
  constructor(private dataService: DataService,
              private dataLocal: DataLocalService,
              private sanitizer: DomSanitizer,
              private utilService: UtilidadesService,
              private splasService: SplashService,
              private navCtrl: NavController) {
    this.dataLocal.setPage('nosotros');
  }

  ngOnInit() {
   // Se habilita cuando este el servicio para consultar información nosotros 
   /* this.dataService.consultarInfoNosotros()
      .then( (resp: NOSOTROS) => {
        this.splasService.dissmissSplash();
        this.objetoNosotros = resp;
        this.getLinkVideo();
      }).catch(resp => {
        this.splasService.dissmissSplash();
        this.utilService.showAlert('Información', resp);
        this.navCtrl.pop();
      });*/

    this.getLinkVideo();

    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloSlide = resp.ESTILOS.SLIDE;
      }
    });
  }

  getLinkVideo(){
    let newURL = this.objetoNosotros.videoNosotros;
    if (newURL.includes('&')){
      let newURLTemp = newURL.split('&');
      newURL = newURLTemp[0];
    }
    newURL = newURL.replace('watch?v=', 'embed/');
   // console.log(newURL);
   // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/tgbNymZ7vqY');
    this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newURL);
  }
}
