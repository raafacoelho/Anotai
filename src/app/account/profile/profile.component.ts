import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxViacepService, ErroCep } from '@brunoc/ngx-viacep';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AngularFirestore]
})
export class ProfileComponent implements OnInit {
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
    private viacep: NgxViacepService,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  ngOnInit() { }

  async openGalery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/'));
      }

      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

      this.uploadPicture(blob);
    } catch (error) {
      console.log(error);
    }
  }

  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref('avatar/ionic.jpg');
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadUrl = ref.getDownloadURL())))
      .subscribe();
  }

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

  // buscarEndereco() {
  //   let cep = this.form.get('cep').value;
  //   this.viacep
  //     .buscarPorCep(cep)
  //     .then(endereco => {
  //       this.logradouro.setValue(endereco.logradouro);
  //       this.bairro.setValue(endereco.bairro);
  //       this.cidade.setValue(endereco.localidade);
  //       console.log(endereco);
  //     })
  //     .catch((error: ErroCep) => {
  //       console.log(error.message);
  //     });
  // }


  async dismissModal() {
    this.modalController.dismiss();
  }
}
