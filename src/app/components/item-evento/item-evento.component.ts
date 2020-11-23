import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EVENTOS, BOTONES, EVENTODISPONIBLE } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-evento',
  templateUrl: './item-evento.component.html',
  styleUrls: ['./item-evento.component.scss'],
})
export class ItemEventoComponent implements OnInit {

  /* 128 = presencial, 219 = virtual y 130=presencial y virtual */
  @Input() evento: EVENTODISPONIBLE;
  estiloEvento: EVENTOS = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT_TITULO: '',
    COLOR_TEXT_SUBTITULO: '',
    COLOR_TEXT_VALOR: '',
    COLOR_TEXT_DOLAR: '',
    COLOR_TEXT_DESCRIPCION: '',
    COLOR_TEXT_F_TIEMPO: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  constructor(private router: Router,
              private dataLocal: DataLocalService) {
               }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloEvento = resp.ESTILOS.EVENTOS;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  verEvento() {
    this.router.navigate(['/evento'], {
      queryParams: {
        evento: this.evento.eventoId
      }
    });
  }

  comprarAcceso() {
    this.router.navigate(['/evento'], {
      queryParams: {
        evento: this.evento.eventoId,
        isComprar: true
      }
    });
  }
}
