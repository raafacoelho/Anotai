import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AngularFirestore]
})
export class ProfileComponent implements OnInit {
  items: Observable<any[]>;

  loading: boolean = false;

  profile: any = {};

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;

  constructor(
    private modalController: ModalController,
    public navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    // this.items = db.collection('Contato').valueChanges();

    // db.collection('Contato').doc('LJZd5hLyuudeJMxydONh').set({
    //   nome: '',
    //   sobrenome: '',
    // })
    // .then(() => {
    //   console.log('Salvo com sucesso!');
    // })
    // .catch((error) => {
    //   console.error('Algo errado:', error );
    // });
  }

  ngOnInit() {}

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

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }


  saveContato() {
    console.log(this.profile);
    this.loading = true;
    this.db.collection('Contato').add(this.profile)
    .then(result => {
      console.log(result);
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  async dismissModal() {
    this.modalController.dismiss();
  }
}
