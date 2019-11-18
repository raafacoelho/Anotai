import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-forma-pgto',
  templateUrl: './forma-pgto.page.html',
  styleUrls: ['./forma-pgto.page.scss'],
  providers: [AngularFirestore]
})
export class FormaPgtoPage implements OnInit {
  loading: boolean = false;

  form: FormGroup = new FormGroup({
    nmcartao: new FormControl(null, [Validators.required]),
    validade: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required]),
    nome: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required]),
  });

  get nmcartao(): AbstractControl {
    return this.form.get('nmcartao');
  }

  get validade(): AbstractControl {
    return this.form.get('validade');
  }

  get cvv(): AbstractControl {
    return this.form.get('cvv');
  }

  get nome(): AbstractControl {
    return this.form.get('nome');
  }

  get cpf(): AbstractControl {
    return this.form.get('cpf');
  }

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private db: AngularFirestore) { }

  ngOnInit() {
  }

  saveCartao() {

    if (this.form.valid) {
      this.loading = true;
      this.db.collection("Cartao").add(this.form.value)
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

  async dismissModal() {
    this.modalController.dismiss();
  }

  Back() {
    this.navCtrl.navigateBack("tabs/account")
  }

}
