import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-e-comanda',
  templateUrl: './e-comanda.component.html',
  styleUrls: ['./e-comanda.component.scss'],
  providers: [AngularFirestore]
})
export class EComandaComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    db: AngularFirestore
  ) {
    this.items = db.collection('itemComanda').valueChanges();
  }

  ngOnInit() {}

  async dismissModal() {
    this.modalController.dismiss();
  }

}
