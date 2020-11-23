import { Component, OnInit } from '@angular/core';
import { GENERAL } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-cantidad',
  templateUrl: './cantidad.component.html',
  styleUrls: ['./cantidad.component.scss'],
})
export class CantidadComponent implements OnInit {

  cantidad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };
  constructor(private dataLocal: DataLocalService,
              private popCtrl: PopoverController) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
      }
    });
  }

  onClickCant(cantidad: any){
    this.popCtrl.dismiss(cantidad);
  }
}
