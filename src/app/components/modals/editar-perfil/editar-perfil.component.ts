import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, TIPODOCUMENTO, DETALLEUSUARIO, USUARIO } from '../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../../services/data-local.service';
import { DataService } from '../../../services/data.service';
import { UtilidadesService } from '../../../services/utilidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {

  marca = 'Marca blanca';
  terminosHtml = {
    texto : 'Autorizo el tratamiento de mis datos personales conforme a la política de protección de datos personales.',
    links: [{
      palabra: 'política de protección de datos personales',
      link: ''
    }]
  };

  @Input() correo: string;
  @Input() idUsuario: string;

  terminos = '';

  usuario: USUARIO = {
    documento: '',
    tipoDocumento: {
      codigo: '',
      nombreTipoDcoumento: ''
    },
    primerNombre: '',
    segundoNombre: '',
    apellidoUno: '',
    apellidoDos: '',
    celular: '',
    correo: '',
    telefono: '',
    idPersona: '',
    fechaNacimiento: ''
  };

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

  editarForm: FormGroup;
  listTipoDocumento: TIPODOCUMENTO[] = [];

  isNombreValido = false;
  isApellidoValido = false;
  isTipoDocumentoValido = false;
  isNumeroDocumentoValido = false;
  isConfirCorreoValido = false;
  isCorreoValido = false;
  isCelularValido = false;
  isContrasenaValido = false;
  constructor(private modalCtlr: ModalController,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private utilService: UtilidadesService,
              private router: Router) {
    this.editarForm = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      nombreDos: ['', Validators.compose([
     //   Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      apellido: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      apellidoDos: ['', Validators.compose([
       // Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      tipoDocumento: ['', Validators.compose([
        Validators.required,
      ])],
      numeroDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9\s]{10}$')
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
      ])]
    });
  }

  ngOnInit() {
  //  this.getDetalleUsuario();
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
      }
    });

    this.terminos = this.utilService.funTransformTextToHTML(this.terminosHtml);

    this.dataService.getTipoDocumentos().then( (resp: TIPODOCUMENTO[]) => {
      this.listTipoDocumento = resp;
      console.log(resp);
    });

    this.getConsultarCliente();
  }

  closeModal() {
    this.modalCtlr.dismiss(
      false
    );
  }

  onClickActualizarPerfil() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        documento: this.editarForm.value.numeroDocumento,
        tipoDocumento: this.editarForm.value.tipoDocumento,
        primerNombre: this.editarForm.value.nombre,
        segundoNombre: this.editarForm.value.nombreDos,
        primerApellido: this.editarForm.value.apellido,
        segundoApellido: this.editarForm.value.apellidoDos,
        celular: this.editarForm.value.celular,
        correo: this.editarForm.value.correo,
        idPersona: this.idUsuario,
        // telefono: '',
        fechaNacimiento: '',
      })
    };

    console.log(request);

    this.dataService.actualizarUsuario(request, this.correo)
      .then( (resp: string) => {
        console.log (resp);
        this.utilService.dissmisLoading();
        this.utilService.showAlert('', resp);
        this.modalCtlr.dismiss(
          true
        );
       // this.router.navigateByUrl('/home', { skipLocationChange: true });
      })
      .catch( resp => {
        this.utilService.dissmisLoading();
        this.utilService.showAlert('Algo salio mal', resp);
      });
  }

  validarCampo(event) {
    switch (event){
      case 'nombre': {
        this.isNombreValido = this.editarForm.controls.nombre.invalid;
        break;
      }
      case 'apellido': {
        this.isApellidoValido = this.editarForm.controls.apellido.invalid;
        break;
      }
      case 'tipoDocumento': {
        this.isTipoDocumentoValido = this.editarForm.controls.tipoDocumento.invalid;
        break;
      }
      case 'numeroDocumento': {
        this.isNumeroDocumentoValido = this.editarForm.controls.numeroDocumento.invalid;
        break;
      }
      case 'correo': {
        if (this.editarForm.value.correo === ''){
          this.isCorreoValido = true;
        }
        this.isCorreoValido = this.editarForm.controls.correo.invalid;
        console.log(this.editarForm);
        break;
      }
      case 'celular': {
        this.isCelularValido = this.editarForm.controls.celular.invalid;
        break;
      }
    }
  }

  validarCampoChange(event){
    switch (event){
      case 'nombre': {
        if (this.editarForm.value.nombre === ''){
          this.isNombreValido = false;
        }
        break;
      }
      case 'apellido': {
        if (this.editarForm.value.apellido === ''){
          this.isApellidoValido = false;
        }
        break;
      }
      case 'tipoDocumento': {
        if (this.editarForm.value.tipoDocumento === ''){
          this.isTipoDocumentoValido = false;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.editarForm.value.numeroDocumento === ''){
          this.isNumeroDocumentoValido = false;
        }
        break;
      }
      case 'correo': {
        if (this.editarForm.value.correo === ''){
          this.isCorreoValido = false;
        }
        break;
      }
      case 'celular': {
        if (this.editarForm.value.celular === ''){
          this.isCelularValido = false;
        }
        break;
      }
    }
  }

  getConsultarCliente(){
    this.dataService.getConsultarCliente(this.correo)
      .then( (resp: USUARIO) => {
        this.usuario = resp;

        this.editarForm.controls.nombre.setValue(this.usuario.primerNombre);
        this.editarForm.controls.nombreDos.setValue(this.usuario.segundoNombre);
        this.editarForm.controls.apellido.setValue(this.usuario.apellidoUno);
        this.editarForm.controls.apellidoDos.setValue(this.usuario.apellidoDos);
        this.editarForm.controls.tipoDocumento.setValue(this.usuario.tipoDocumento.codigo);
        this.editarForm.controls.numeroDocumento.setValue(this.usuario.documento);
        this.editarForm.controls.correo.setValue(this.usuario.correo);
        this.editarForm.controls.celular.setValue(this.usuario.celular);

        this.editarForm.value.nombre = this.usuario.primerNombre;
        this.editarForm.value.nombreDos = this.usuario.segundoNombre;
        this.editarForm.value.apellido = this.usuario.apellidoUno;
        this.editarForm.value.apellidoDos = this.usuario.apellidoDos;
        this.editarForm.value.tipoDocumento = this.usuario.tipoDocumento.codigo;
        this.editarForm.value.numeroDocumento = this.usuario.documento;
        this.editarForm.value.correo = this.usuario.correo;
        this.editarForm.value.celular = this.usuario.celular;
      }).catch(resp => {
      });
  }
}
