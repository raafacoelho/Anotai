import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
<<<<<<< HEAD
=======
import { ProfileComponent } from './profile/profile.component';
import { CadastroPgtoComponent } from './cadastro-pgto/CadastroPgtoComponent';
>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
<<<<<<< HEAD
  declarations: [AccountPage]
=======
  declarations: [AccountPage, ProfileComponent, CadastroPgtoComponent],
  entryComponents: [ProfileComponent, CadastroPgtoComponent]
>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5
})
export class AccountPageModule {}
