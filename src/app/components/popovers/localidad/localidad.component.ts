import { Component, OnInit } from '@angular/core';
import { LOCALIDAD, Sectore, GENERAL } from '../../../interfaces/interfaces';
import { NavParams, PopoverController } from '@ionic/angular';
import { DataLocalService } from '../../../services/data-local.service';


@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.scss'],
})
export class LocalidadComponent implements OnInit {

  localidad: LOCALIDAD[];

  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };

  constructor(private dataLocal: DataLocalService,
              private navParam: NavParams,
              private popCtrl: PopoverController) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
      }
    });

    this.localidad = this.navParam.get('localidad');
    this.localidad.forEach(listItem => {
      listItem.expanded = false;
    });
  }

  iconDetail(silla: LOCALIDAD){
    if (silla.sectores.length > 0){
      if (silla.expanded){
        return 'chevron-down-outline';
      } else{
        return 'chevron-forward-outline';
      }
    }else {
      return '';
    }
  }

  lines(silla: LOCALIDAD){
    if (silla.expanded){
      return 'none';
    } else{
      return 'inset';
    }
  }

  seleccionaCiudad(sector: Sectore){
    console.log(sector);
    this.popCtrl.dismiss(sector);
  }

  onClickSilla(silla: LOCALIDAD) {
    if (silla.sectores.length > 0){
      if (silla.expanded) {
        silla.expanded = false;
      } else {
        this.localidad.forEach(listItem => {
          if (silla === listItem) {
            listItem.expanded = !listItem.expanded;
          } else {
            listItem.expanded = false;
          }
          return listItem;
        });
      }
    } else {
      this.popCtrl.dismiss(silla);
    }
  }
}
