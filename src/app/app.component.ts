import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { Menu, ConfiguracionEmpresa } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { DataLocalService } from './services/data-local.service';
import { ModalService } from './services/modal.service';
import { SplashService } from './services/splash.service';
import { Router } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  menu: Observable<Menu[]>;
  ocultarMenu = true;
  toolbar: ToolbarComponent;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private dataLocal: DataLocalService,
    private modalService: ModalService,
    private splashService: SplashService,
    private router: Router
  ) {
    this.splashService.showSplash();
    this.getConfiguracion();
    this.initializeApp();
  }

  initializeApp() {
    this.menu = this.dataService.getMenuOpts();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getConfiguracion() {
    this.dataService.getConfiguracion()
        .then( (resp: ConfiguracionEmpresa) => {
            this.dataLocal.guardarConfiguracion(resp);
        }).catch( resp => {
            this.modalService.showAlert('Algo salio mal', resp);
    });
  }

  async redirectTo(redirect: any){
    if (redirect === 'cerrarSesion') {
      const result = await this.modalService.openModalCerrarSesion();
      console.log('this.router.url', this.router.url);
     // console.log(this.toolbar.isLogueado);
     // this.toolbar.setIsLogueado(result);
    } else{
      this.router.navigate([redirect], {
        queryParams: {}
      });
    }
  }

  isLine(i){
    if (i === 3 || i === 5 || i === 7){
      return '';
    }else {
      return 'none';
    }
  }
}
