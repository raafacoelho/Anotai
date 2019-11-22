import { Component, OnInit, Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  providers: [AngularFirestore]
})
export class CardapioComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    db: AngularFirestore
  ) {
    this.items = db.collection('Item').valueChanges();
    console.log(this.items);
  }

  ngOnInit() { }

  async dismissModal() {
    this.modalController.dismiss();
  }
}
