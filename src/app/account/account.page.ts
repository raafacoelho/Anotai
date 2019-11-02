import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ProfileComponent } from './profile/profile.component';
import { CadastroPgtoComponent } from './cadastro-pgto/CadastroPgtoComponent';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async abrirModalProfile() {

    const modal = await this.modalController.create({
      component: ProfileComponent
    });

    return await modal.present();
  }

  async abrirModalPagamento() {

    const modal = await this.modalController.create({
      component: CadastroPgtoComponent
    });

    return await modal.present();
  }

}
