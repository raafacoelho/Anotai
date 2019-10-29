import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileComponent } from './profile/profile.component';

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

}
