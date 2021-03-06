import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { FOOTER, BOTONES, EMPRESA } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  marca: string;
  imagen: string;
  empresa: EMPRESA = {
    nombreEmpresa: '',
    nitEmpresa: '',
    estadoEmpresa: '',
    correoEmpresa: '',
    telefonoEmpresa: '',
    direccionEmpresa: ''
  };
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
              private modalService: ModalService,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estilosFooter = resp.ESTILOS.FOOTER;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
        this.imagen = resp.IMAGEN;
      }
    });

    this.dataLocal.cargarEmpresa().then( resp => {
      this.empresa = resp;
    });
  }

  onClickNosotros(){
    this.router.navigate(['/nosotros'], {
      queryParams: {}
    });
  }

  onClickContactenos(){
    this.modalService.openModalContactenos();
  }
}
