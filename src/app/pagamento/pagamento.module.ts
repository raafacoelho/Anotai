import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagamentoPage } from './pagamento.page';

import { PayPal } from '@ionic-native/paypal/ngx';

const routes: Routes = [
  {
    path: '',
    component: PagamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagamentoPage],
  providers: [PayPal]
})
export class PagamentoPageModule { }
