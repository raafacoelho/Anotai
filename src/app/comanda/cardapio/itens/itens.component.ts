import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/model/categoria.model';

@Component({
  selector: 'itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {

  @Input() collection: AngularFirestoreCollection<Categoria>;
  @Input() categoriaId: string;
  public itens: Observable<Item[]>;

  constructor() { }

  ngOnInit() {

    this.collection = this.collection.doc(this.categoriaId).collection<Item>('item');

    this.itens = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
