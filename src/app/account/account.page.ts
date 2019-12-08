import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers: [AngularFirestore]
})
export class AccountPage implements OnInit {
  items: Observable<any[]>;
  loading = false;
  profile: any = {};

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required]),
    celular: new FormControl(null, [Validators.required]),
    datanasc: new FormControl(null, [Validators.required]),
    sexo: new FormControl(null, [Validators.required]),
  });

  get nome(): AbstractControl {
    return this.form.get('nome');
  }

  get celular(): AbstractControl {
    return this.form.get('celular');
  }

  get cpf(): AbstractControl {
    return this.form.get('cpf');
  }

  get datanasc(): AbstractControl {
    return this.form.get('datanasc');
  }
  get sexo(): AbstractControl {
    return this.form.get('datanasc');
  }

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    private db: AngularFirestore
  ) { }

  ngOnInit() { }

  saveContato() {

    if (this.form.valid) {
      this.loading = true;
      this.db.collection('Cliente').add(this.form.value)
        .then(
          result => {
            console.log(result);
            this.loading = false;
          },
          err => {
            console.log(err);
            this.loading = false;
          }
        );
    }

  }
}
