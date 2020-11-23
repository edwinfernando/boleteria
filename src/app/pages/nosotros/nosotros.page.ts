import { Component, OnInit } from '@angular/core';
import { GENERAL, SLIDE, Categoria } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  slide = 'https://images.pexels.com/photos/1036641/pexels-photo-1036641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  categorias: Categoria[] = [];
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
              private dataLocal: DataLocalService) {
    this.dataLocal.setPage('nosotros');
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloSlide = resp.ESTILOS.SLIDE;
      }
    });

    this.dataService.getCategorias().subscribe( resp => {
      this.categorias = resp;
    });
  }

}
