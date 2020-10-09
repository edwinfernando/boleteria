import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarPedidoPageRoutingModule } from './verificar-pedido-routing.module';

import { VerificarPedidoPage } from './verificar-pedido.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarPedidoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerificarPedidoPage]
})
export class VerificarPedidoPageModule {}
