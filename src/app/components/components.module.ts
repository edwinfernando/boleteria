import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEventoComponent } from './item-evento/item-evento.component';
import { SlideComponent } from './slide/slide.component';
import { IonicModule } from '@ionic/angular';
import { PaisesComponent } from './modals/paises/paises.component';
import { ExpandibleComponent } from './expandible/expandible.component';
import { ItemCategoriaComponent } from './item-categoria/item-categoria.component';
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

@NgModule({
  declarations: [
    ItemEventoComponent,
    ItemEventoDosComponent,
    SlideComponent,
    PaisesComponent,
    ExpandibleComponent,
    ExpandibleEventoComponent,
    ItemCategoriaComponent,
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
    CerrarSesionComponent
  ],
  exports: [
    ItemEventoComponent,
    ItemEventoDosComponent,
    SlideComponent,
    PaisesComponent,
    ExpandibleComponent,
    ExpandibleEventoComponent,
    ItemCategoriaComponent,
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
    CerrarSesionComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
