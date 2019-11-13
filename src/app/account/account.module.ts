import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { ProfileComponent } from './profile/profile.component';
import { CadastroPgtoComponent } from './cadastro-pgto/CadastroPgtoComponent';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],

  declarations: [AccountPage, ProfileComponent, CadastroPgtoComponent],
  entryComponents: [ProfileComponent, CadastroPgtoComponent]

})
export class AccountPageModule { }
