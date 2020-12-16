import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEventoComponent } from './item-evento/item-evento.component';
import { SlideComponent } from './slide/slide.component';
import { IonicModule } from '@ionic/angular';
import { ExpandibleComponent } from './expandible/expandible.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RegistrateComponent } from './modals/registrate/registrate.component';
import { IniciarSesionComponent } from './modals/iniciar-sesion/iniciar-sesion.component';
import { ToolbarModalComponent } from './toolbar-modal/toolbar-modal.component';
import { FooterComponent } from './footer/footer.component';
import { ItemPromocionComponent } from './item-promocion/item-promocion.component';
import { AlertaComponent } from './modals/alerta/alerta.component';
import { SplashComponent } from './modals/splash/splash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpandibleEventoComponent } from './expandible-evento/expandible-evento.component';
import { PipesModule } from '../pipes/pipes.module';
import { ItemEventoDosComponent } from './item-evento-dos/item-evento-dos.component';
import { PromocionaEventoComponent } from './promociona-evento/promociona-evento.component';
import { TransferirEntradaComponent } from './modals/transferir-entrada/transferir-entrada.component';
import { SolicitarEntradaComponent } from './modals/solicitar-entrada/solicitar-entrada.component';
import { TuPedidoComponent } from './modals/tu-pedido/tu-pedido.component';
import { CerrarSesionComponent } from './modals/cerrar-sesion/cerrar-sesion.component';
import { EditarPerfilComponent } from './modals/editar-perfil/editar-perfil.component';
import { RecuperarContrasenaComponent } from './modals/recuperar-contrasena/recuperar-contrasena.component';
import { CambiarContrasenaComponent } from './modals/cambiar-contrasena/cambiar-contrasena.component';
import { ErrorConexionComponent } from './modals/error-conexion/error-conexion.component';
import { ItemPatrocinadorComponent } from './item-patrocinador/item-patrocinador.component';
import { SilleteriaComponent } from './popovers/silleteria/silleteria.component';
import { LocalidadComponent } from './popovers/localidad/localidad.component';
import { CantidadComponent } from './popovers/cantidad/cantidad.component';
import { ContactenosComponent } from './modals/contactenos/contactenos.component';
import { RecaptchaModule} from 'ng-recaptcha';
import { RegistrarPinComponent } from './modals/registrar-pin/registrar-pin.component';

@NgModule({
  declarations: [
    ItemEventoComponent,
    ItemEventoDosComponent,
    SlideComponent,
    ExpandibleComponent,
    ExpandibleEventoComponent,
    ItemPatrocinadorComponent,
    ItemPromocionComponent,
    ToolbarComponent,
    ToolbarModalComponent,
    RegistrateComponent,
    IniciarSesionComponent,
    FooterComponent,
    AlertaComponent,
    SplashComponent,
    PromocionaEventoComponent,
    TransferirEntradaComponent,
    SolicitarEntradaComponent,
    TuPedidoComponent,
    CerrarSesionComponent,
    EditarPerfilComponent,
    RecuperarContrasenaComponent,
    CambiarContrasenaComponent,
    ErrorConexionComponent,
    LocalidadComponent,
    SilleteriaComponent,
    CantidadComponent,
    ContactenosComponent,
    RegistrarPinComponent
  ],
  exports: [
    ItemEventoComponent,
    ItemEventoDosComponent,
    SlideComponent,
    ExpandibleComponent,
    ExpandibleEventoComponent,
    ItemPatrocinadorComponent,
    ItemPromocionComponent,
    ToolbarComponent,
    ToolbarModalComponent,
    RegistrateComponent,
    IniciarSesionComponent,
    FooterComponent,
    AlertaComponent,
    SplashComponent,
    PromocionaEventoComponent,
    TransferirEntradaComponent,
    SolicitarEntradaComponent,
    TuPedidoComponent,
    CerrarSesionComponent,
    EditarPerfilComponent,
    RecuperarContrasenaComponent,
    CambiarContrasenaComponent,
    ErrorConexionComponent,
    LocalidadComponent,
    SilleteriaComponent,
    CantidadComponent,
    ContactenosComponent,
    RegistrarPinComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RecaptchaModule
  ],
})
export class ComponentsModule { }
