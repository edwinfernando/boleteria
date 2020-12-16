import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BOTONES, GENERAL, TIPODOCUMENTO, TIPOQUEJASOLICITUD, SOLICITUDEVENTO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UtilidadesService } from '../../../services/utilidades.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.scss'],
})
export class ContactenosComponent implements OnInit {

  marca = 'Marca blanca';
  cabeceraContactenos = 'Bienvenido a nuestro sistema de registro de peticiones, quejas y reclamos. Por favor diligencie el siguiente formulario, para obtener su número de caso e iniciar el proceso.';

  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };

  registroForm: FormGroup;
  listEventosSolicitud: SOLICITUDEVENTO[] = [];
  listTipoDocumento: TIPODOCUMENTO[] = [];
  listTipoQueja: TIPOQUEJASOLICITUD[] = [
    {
      codigo: '1',
      nombreTipo: 'Devoluciones',
      tipoSolicitud: [
        {
          codigo: '1',
          nombreTipo: 'Contracargo',
          tipoSolicitud: []
        },
        {
          codigo: '2',
          nombreTipo: 'Efectivo en punto de venta',
          tipoSolicitud: []
        },
        {
          codigo: '3',
          nombreTipo: 'Tarjeta de credito',
          tipoSolicitud: []
        }
      ]
    },
    {
      codigo: '2',
      nombreTipo: 'Felicitaciones',
      tipoSolicitud: [{
        codigo: '3',
        nombreTipo: 'Felicitación',
        tipoSolicitud: []
      }]
    },
    {
      codigo: '3',
      nombreTipo: 'Peticiones',
      tipoSolicitud: []
    },
    {
      codigo: '4',
      nombreTipo: 'Quejas',
      tipoSolicitud: [
        {
          codigo: '3',
          nombreTipo: 'Error en situación',
          tipoSolicitud: []
        },
        {
          codigo: '4',
          nombreTipo: 'Inconformidad en momento de compra',
          tipoSolicitud: []
        }
      ]
    },
    {
      codigo: '5',
      nombreTipo: 'Reclamos y solicitudes',
      tipoSolicitud: [
        {
          codigo: '3',
          nombreTipo: 'Aplazamiento de evento',
          tipoSolicitud: []
        }
      ]
    },
    {
      codigo: '6',
      nombreTipo: 'Solicitud de información',
      tipoSolicitud: [
        {
          codigo: '3',
          nombreTipo: 'Confirmación de compra',
          tipoSolicitud: []
        }
      ]
    }
  ];

  listTipoSolicitud: TIPOQUEJASOLICITUD[];

  isNombreValido = false;
  isApellidoValido = false;
  isTipoDocumentoValido = false;
  isNumeroDocumentoValido = false;
  isCorreoValido = false;
  isCelularValido = false;
  isEvento = false;
  isTipoQueja = false;
  isTipoSolicitud = false;
  isSolicitud = false;
  captchaPassed = false;

  constructor(private modalCtlr: ModalController,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private utilService: UtilidadesService) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      apellido: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      tipoDocumento: ['', Validators.compose([
        Validators.required,
      ])],
      numeroDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
        Validators.email
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      celular: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9\s]{10}$')
      ])],
      evento: ['', Validators.compose([
        Validators.required,
      ])],
      tipoQueja: ['', Validators.compose([
        Validators.required,
      ])],
      tipoSolicitud: ['', Validators.compose([
        Validators.required,
      ])],
      solicitud: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
      }
    });

    this.dataService.getTipoDocumentos().then( (resp: TIPODOCUMENTO[]) => {
      this.listTipoDocumento = resp;
    });

    this.dataLocal.getEventosSolicitud().then( resp => {
      this.listEventosSolicitud = resp;
    });
  }

  closeModal() {
    this.modalCtlr.dismiss(
      false
    );
  }

  onClickContactar() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        documento: this.registroForm.value.numeroDocumento,
        tipoDocumento: this.registroForm.value.tipoDocumento,
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        celular: this.registroForm.value.celular,
        correo: this.registroForm.value.correo,
        eventoId: this.registroForm.value.evento,
        tipoQueja: this.registroForm.value.tipoQueja,
        tipoSolicitud: this.registroForm.value.tipoSolicitud,
        solicitud: this.registroForm.value.solicitud
      })
    };

    console.log(request);

    this.dataService.crearSolicitud(request)
      .then( resp => {
        // console.log (resp);
        this.utilService.dissmisLoading();
        this.modalCtlr.dismiss(true);
      })
      .catch( resp => {
        console.log(resp);
        this.captchaPassed = false;
        this.utilService.dissmisLoading();
        this.utilService.showAlert('Algo salio mal', resp);
      });
  }

  validarCampo(event) {
    switch (event){
      case 'nombre': {
        if (this.registroForm.value.nombre !== ''){
          this.isNombreValido = this.registroForm.controls.nombre.invalid;
        }
        break;
      }
      case 'apellido': {
        if (this.registroForm.value.apellido !== ''){
          this.isApellidoValido = this.registroForm.controls.apellido.invalid;
        }
        break;
      }
      case 'tipoDocumento': {
        if (this.registroForm.value.tipoDocumento !== ''){
          this.isTipoDocumentoValido = this.registroForm.controls.tipoDocumento.invalid;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.registroForm.value.numeroDocumento !== ''){
          this.isNumeroDocumentoValido = this.registroForm.controls.numeroDocumento.invalid;
        }
        break;
      }
      case 'correo': {
        if (this.registroForm.value.correo !== ''){
          this.isCorreoValido = this.registroForm.controls.correo.invalid;
        }
        break;
      }
      case 'celular': {
        if (this.registroForm.value.celular !== ''){
          this.isCelularValido = this.registroForm.controls.celular.invalid;
        }
        break;
      }
      case 'evento': {
        if (this.registroForm.value.evento !== ''){
          this.isEvento = this.registroForm.controls.evento.invalid;
        }
        break;
      }
      case 'tipoQueja': {
        if (this.registroForm.value.tipoQueja !== ''){
          this.isTipoQueja = this.registroForm.controls.tipoQueja.invalid;
        }
        break;
      }
      case 'tipoSolicitud': {
        if (this.registroForm.value.tipoSolicitud !== ''){
          this.isTipoSolicitud = this.registroForm.controls.tipoSolicitud.invalid;
        }
        break;
      }
      case 'solicitud': {
        if (this.registroForm.value.solicitud !== ''){
          this.isSolicitud = this.registroForm.controls.solicitud.invalid;
        }
        break;
      }
    }
  }

  validarCampoChange(event){
    switch (event){
      case 'nombre': {
        if (this.registroForm.value.nombre === ''){
          this.isNombreValido = false;
        }
        break;
      }
      case 'apellido': {
        if (this.registroForm.value.apellido === ''){
          this.isApellidoValido = false;
        }
        break;
      }
      case 'tipoDocumento': {
        if (this.registroForm.value.tipoDocumento === ''){
          this.isTipoDocumentoValido = false;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.registroForm.value.numeroDocumento === ''){
          this.isNumeroDocumentoValido = false;
        }
        break;
      }
      case 'correo': {
        if (this.registroForm.value.correo === ''){
          this.isCorreoValido = false;
        }
        break;
      }
      case 'celular': {
        if (this.registroForm.value.celular === ''){
          this.isCelularValido = false;
        }
        break;
      }
      case 'evento': {
        if (this.registroForm.value.evento !== ''){
          this.isEvento = this.registroForm.controls.evento.invalid;
        }
        break;
      }
      case 'tipoQueja': {
        if (this.registroForm.value.tipoQueja !== ''){
          this.isTipoQueja = this.registroForm.controls.tipoQueja.invalid;

          this.listTipoQueja.forEach( tipoQueja => {
            if (tipoQueja.codigo === this.registroForm.value.tipoQueja ){
              this.listTipoSolicitud = tipoQueja.tipoSolicitud;
            }
          });
        }
        break;
      }
      case 'tipoSolicitud': {
        if (this.registroForm.value.tipoSolicitud !== ''){
          this.isTipoSolicitud = this.registroForm.controls.tipoSolicitud.invalid;
        }
        break;
      }
      case 'solicitud': {
        if (this.registroForm.value.solicitud !== ''){
          this.isSolicitud = this.registroForm.controls.solicitud.invalid;
        }
        break;
      }
    }
  }

  resolved(response: string) {
    console.log(`Resolved captcha with response: ${response}`);    
    if (response != null) {
      if(response != null && response != undefined) {
        this.captchaPassed = !this.captchaPassed;
      }
    }

  }
}
