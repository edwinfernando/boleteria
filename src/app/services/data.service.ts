import { Injectable } from '@angular/core';
import { Pais, Menu, Slide, Categoria, RespuestaServidor } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataLocalService } from './data-local.service';
import jwt_decode from 'jwt-decode';
import { SplashService } from './splash.service';
import { ModalService } from './modal.service';

const URL = environment.url;
const NIT_EMPRESA = environment.nitEmpresa;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions: any;
  countdown = 60;
  timerHandler: number;
  constructor(private http: HttpClient,
              private dataLocal: DataLocalService,
              private splashService: SplashService,
              private modalService: ModalService) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  }

  getConfiguracion() {
    /*this.http.get<ConfiguracionEmpresa>('/assets/data/configuracion.json')
        .subscribe( resp => {
          this.dataLocal.guardarConfiguracion(resp);
        });*/

    const empresa = {
      strPeticion: JSON.stringify({
        nitEmpresa: NIT_EMPRESA
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/configuracion/consultarConfiguracion`,
                      empresa,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          this.startTimer(false);
                           // this.splashService.dissmissSplash();
                          strRespuesta = JSON.parse(strRespuesta.respuesta);
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error('Aqui', error);
                          this.splashService.dissmissSplash();
                          this.modalService.openModalError();
                         // this.startTimer(true);
                        }
                      );
    });
  }

  consultarEmpresa() {
    const empresa = {
      strPeticion: JSON.stringify({
        nitEmpresa: NIT_EMPRESA
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/configuracion/consultarEmpresa`,
                      empresa,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          strRespuesta = JSON.parse(strRespuesta.respuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                        }
                      );
    });
  }

  loginUsuario(login: string, password: string) {
    const request = {
      strPeticion: JSON.stringify({
        usuarioLogin: login,
        usuarioContrasena: password
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/login`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            const decoded = jwt_decode(strRespuesta.respuesta);
                          //  resolve(decoded);
                            // this.dataLocal.setLogin(decoded.sub);
                            resolve (this.getObtenerDetalleUsuario(decoded.sub));
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  crearUsuario(request: any, correo: string) {
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/crearCliente`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor)  => {
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.mensajeRespuesta);
                            // this.dataLocal.setLogin(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                            this.getObtenerDetalleUsuario(correo);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getObtenerDetalleUsuario(usuario: any) {
    const request = {
      strPeticion: JSON.stringify({
        nombreUsuario: usuario
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/obtenerDetalleUsuarioPorNombre`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor)  => {
                         // console.log(strRespuesta.respuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                            this.dataLocal.setLogin(strRespuesta.respuesta);
                            console.log(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getConsultarCliente(usuario: any) {
    const request = {
      strPeticion: JSON.stringify({
        correo: usuario
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/consultarCliente`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor)  => {
                          strRespuesta = JSON.parse(strRespuesta.respuesta);
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                         //   this.dataLocal.setLogin(strRespuesta.respuesta);
                         //   console.log(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  actualizarUsuario(request: any, correo: string) {
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/actualizarCliente`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor)  => {
                          strRespuesta = JSON.parse(strRespuesta.respuesta);
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.mensajeRespuesta);
                            this.getObtenerDetalleUsuario(correo);
                            // this.dataLocal.setLogin(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  cambiarClave(request: any) {
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/cambiarClave`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor)  => {
                          strRespuesta = JSON.parse(strRespuesta.respuesta);
                          console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.mensajeRespuesta);
                            // this.dataLocal.setLogin(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getTipoDocumentos(){
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/datos/obtenerTiposDeDocumentos`,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                    //      console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getCiudadesEventosDisponibles(){
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/portal/territorios/obtenerCiudadesPorEventosDisponibles`,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getCategoriasEventos(){
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/portal/categoria/consultarCategorias`,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getEventosFiltro(evento: string, fecha: string, idCategoria: string, idCiudad: string){
    const request = {
      peticion: JSON.stringify({
        nombreEvento: evento,
        fecha,
        categoria: idCategoria,
        ciudad: idCiudad
      })};

    console.log(request);
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/portal/eventos/obtenerEventosFiltros`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                          (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getEventosDisponibles(){
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/portal/eventos/obtenerEventosDisponibles`,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getEventoPorId(idEvento: string){
    const request = {
      strPeticion: JSON.stringify({
        eventoId: idEvento
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/eventos/obtenerEventosPorId`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getSilleteriaEventoPorId(idEvento: any){
    const request = {
      strPeticion: JSON.stringify({
        eventoId: idEvento
      })};

    console.log(request);
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/zonas/obtenerConsolidadosZonasByEvento`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  getSilleteriaEventoPorEvento(idEvento: any, idZona: any){
    const request = {
      strPeticion: JSON.stringify({
        eventoId: idEvento,
        zonaId: idZona
      })};

    console.log(request);
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/silleteria/obtenerSilleteriaZonasByEvento`,
                      request,
                      { headers: this.httpOptions }).subscribe(
                        (strRespuesta: RespuestaServidor) => {
                         // console.log(strRespuesta);
                          if (strRespuesta.codigoRespuesta === '0'){
                            resolve(strRespuesta.respuesta);
                          //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                          }else {
                            reject(strRespuesta.mensajeRespuesta);
                          }
                        },
                        error => {
                          console.error(error);
                          this.modalService.openModalError();
                        }
                      );
    });
  }

  /** SIMULADO */
  getMenuOpts() {
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }

  getPaises() {
    return this.http.get<Pais[]>('/assets/data/paises.json');
  }

  getSlides() {
    return this.http.get<Slide[]>('/assets/data/slide.json');
  }

  getCategorias() {
    return this.http.get<Categoria[]>('/assets/data/categorias.json');
  }

  /**
   * Contador consulta configuración, cierra splash
   */
  stop() {
    if (this.timerHandler) {
      window.clearInterval(this.timerHandler);
      this.timerHandler = 0;
    }
  }

  startTimer(error){
    this.countdown = 3;
    this.timerHandler = window.setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        this.splashService.dissmissSplash();
        if (error){
          this.modalService.openModalError();
        }
        this.stop();
      }
    }, 1000);
  }
}
