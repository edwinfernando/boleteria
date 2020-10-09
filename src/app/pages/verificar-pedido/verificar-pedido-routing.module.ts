import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarPedidoPage } from './verificar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarPedidoPageRoutingModule {}
