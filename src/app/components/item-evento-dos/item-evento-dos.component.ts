import { Component, OnInit, Input } from '@angular/core';
import { Evento, EVENTOS, BOTONES, EVENTODISPONIBLE } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-evento-dos',
  templateUrl: './item-evento-dos.component.html',
  styleUrls: ['./item-evento-dos.component.scss'],
})
export class ItemEventoDosComponent implements OnInit {

  @Input() evento: EVENTODISPONIBLE;
  hoy: any;
  dias: any;
  horas: any;
  minutes: any;
  countdown = 60;
  timerHandler: number;

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
              private dataLocal: DataLocalService,
              private modalController: ModalController) {
    this.hoy = new Date();
  }

  async ngOnInit() {
    this.horas = 24 - this.hoy.getHours();
    this.minutes = this.hoy.getMinutes();
    this.startTimer();

    const fechados = new Date(this.evento.eventoFechaInicio);
    const resultado = fechados.getTime() - this.hoy.getTime();
    this.dias = Math.floor(resultado / (1000 * 60 * 60 * 24 ));

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
        evento: JSON.stringify(this.evento)
      }
    });
  }

  comprarAcceso() {
    this.router.navigate(['/evento'], {
      queryParams: {
        evento: JSON.stringify(this.evento),
        isComprar: true
      }
    });
  }

   /** Contador de tiempo para el evento */

   stop() {
    if (this.timerHandler) {
      window.clearInterval(this.timerHandler);
      this.timerHandler = 0;
    }
  }

  startTimer(){
    this.countdown = 60;
    this.stop();
    this.timerHandler = window.setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        this.minutes -= 1;

        if (this.minutes <= 0){
          this.minutes = 60;
          this.horas -= 1;
        }

        if (this.horas <= 0){
          this.dias -= -1;
          this.horas = 24;
        }

        this.stop();
        this.startTimer();
      }
    }, 1000);
  }
}
