import { Component, OnInit, Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/app/model/empresa.model';
import { Categoria } from 'src/app/model/categoria.model';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  providers: [AngularFirestore]
})
export class CardapioComponent implements OnInit {
  public categorias: Observable<Categoria[]>;
  public categoriasCollection: AngularFirestoreCollection<Categoria>;

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    db: AngularFirestore
  ) {

    this.categoriasCollection = db.collection<Empresa>('Empresa').doc(/*Id empresa*/'OyRRqKJJyUz655uN8fR9').collection<Categoria>('Categoria');

    this.categorias = this.categoriasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() { }

  async dismissModal() {
    this.modalController.dismiss();
  }
}
