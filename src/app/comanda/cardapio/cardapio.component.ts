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
    console.log('carai');
    this.items = db.collection('Burguers').valueChanges();
  }

  ngOnInit() {
    // this.db.database.app. .collection('Burguers')
    //   .get()
    //   .then(snapshot => {
    //     if (snapshot.empty) {
    //       console.log('nada aqui');
    //       return;
    //     }
    //     snapshot.forEach(doc => {
    //       console.log(doc);
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  async dismissModal() {
    this.modalController.dismiss();
  }
}
