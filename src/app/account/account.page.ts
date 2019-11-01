import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ModalController } from '@ionic/angular';
import { ProfileComponent } from './profile/profile.component';
import { CadastroPgtoComponent } from './cadastro-pgto/CadastroPgtoComponent';
>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  constructor(private modalController: ModalController) { }
>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5

  ngOnInit() {
  }

<<<<<<< HEAD
=======

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

>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5
}
