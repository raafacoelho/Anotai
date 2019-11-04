import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
})
export class CardapioComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
    this.modalController.dismiss();
  }

}
