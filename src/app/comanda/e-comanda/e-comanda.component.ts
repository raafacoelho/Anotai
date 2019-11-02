import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-e-comanda',
  templateUrl: './e-comanda.component.html',
  styleUrls: ['./e-comanda.component.scss'],
})
export class EComandaComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
    this.modalController.dismiss();
  }

}
