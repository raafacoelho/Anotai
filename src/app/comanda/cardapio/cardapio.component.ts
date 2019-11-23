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
  comida: Observable<any[]>;
  bebida: Observable<any[]>;
  sobremesa: Observable<any[]>;

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    db: AngularFirestore
  ) {
    this.comida = db.collection('Comida').valueChanges();
    this.bebida = db.collection('Bebida').valueChanges();
    this.sobremesa = db.collection('Sobremesa').valueChanges();
  }

  ngOnInit() { }

  async dismissModal() {
    this.modalController.dismiss();
  }
}
