import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { FOOTER, BOTONES } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  estilosFooter: FOOTER = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT_TITULO: '',
    COLOR_TEXT_CONTENIDO: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  constructor(private dataLocal: DataLocalService,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estilosFooter = resp.ESTILOS.FOOTER;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  onClickNosotros(){
    this.router.navigate(['/nosotros'], {
      queryParams: {}
    });
  }

  onClickContactenos(){
    this.router.navigate(['/contactenos'], {
      queryParams: {}
    });
  }
}
