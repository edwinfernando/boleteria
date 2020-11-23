import { Component, OnInit } from '@angular/core';
import { BOTONES } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-error-conexion',
  templateUrl: './error-conexion.component.html',
  styleUrls: ['./error-conexion.component.scss'],
})
export class ErrorConexionComponent implements OnInit {

  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  constructor(private dataLocal: DataLocalService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  onClickRefrescar(){
    // this.navCtrl.setDirection(this.navCtrl.getActive().component);
    // this.navCtrl.navigateRoot('/home');
    location.reload();
  }
}
