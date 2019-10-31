import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss'],
})

export class ComandaComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
    this.modalController.dismiss();
  }
}
