import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPageRoutingModule } from './mi-perfil-routing.module';

import { MiPerfilPage } from './mi-perfil.page';
import { ComponentsModule } from '../../components/components.module';
import { MisEventosPageModule } from '../mis-eventos/mis-eventos.module';
import { NotificacionesPageModule } from '../notificaciones/notificaciones.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiPerfilPageRoutingModule,
    ComponentsModule,
    MisEventosPageModule,
    NotificacionesPageModule
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
