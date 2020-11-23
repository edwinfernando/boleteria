import { Component, OnInit, Input } from '@angular/core';
import { GENERAL, Patrocinadores } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-item-patrocinador',
  templateUrl: './item-patrocinador.component.html',
  styleUrls: ['./item-patrocinador.component.scss'],
})
export class ItemPatrocinadorComponent implements OnInit {

  @Input() patrocinador: Patrocinadores;
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
