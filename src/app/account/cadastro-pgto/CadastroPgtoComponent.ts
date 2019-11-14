import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-pgto',
  templateUrl: './cadastro-pgto.component.html',
  styleUrls: ['./cadastro-pgto.component.scss'],
})
export class CadastroPgtoComponent implements OnInit {

  constructor(private modalController: ModalController, private navCtrl: NavController) { }

  ngOnInit() { }

  async dismissModal() {
    this.modalController.dismiss();
  }

}
