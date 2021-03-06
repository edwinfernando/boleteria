import { Component, OnInit, Input } from '@angular/core';
import { Categoria, GENERAL } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-item-promocion',
  templateUrl: './item-promocion.component.html',
  styleUrls: ['./item-promocion.component.scss'],
})
export class ItemPromocionComponent implements OnInit {

  @Input() categoria: Categoria;
  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '#FFFFFF',
    COLOR_BACKGROUND_SLIDES: '#FFFFFF',
    COLOR_BACKGROUND_EVENTOS: '#FFFFFF',
    COLOR_BACKGROUND_CATEGORIAS: '#FFFFFF',
    COLOR_TEXT: '#000000'
  };
  constructor(private dataLocal: DataLocalService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
      }
    });
  }
}
