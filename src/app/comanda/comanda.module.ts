import { CardapioComponent } from './cardapio/cardapio.component';
import { EComandaComponent } from './e-comanda/e-comanda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComandaPage } from './comanda.page';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';

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
  declarations: [ComandaPage, EComandaComponent, CardapioComponent],
  providers: [QRScanner],
  entryComponents: [EComandaComponent, CardapioComponent]
})
export class ComandaPageModule { }
