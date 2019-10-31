import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComandaPage } from './comanda.page';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { PagamentoComponent } from './pagamento/pagamento.component';

const routes: Routes = [
  {
    path: '',
    component: ComandaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComandaPage, PagamentoComponent],
  providers: [QRScanner],
  entryComponents: [PagamentoComponent]
})
export class ComandaPageModule {}
