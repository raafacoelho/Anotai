import { CardapioComponent } from './cardapio/cardapio.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { EComandaComponent } from './e-comanda/e-comanda.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cliente } from '../model/cliente.model';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { map } from 'rxjs/operators';
import { Comanda } from '../model/comanda.model';
import { StatusComanda } from '../enum/status-comanda.enum';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

  public comandas: Comanda[];
  public clienteCollection: AngularFirestoreCollection<Comanda>;
  storage: Storage;

  idEmpresaKey: string = '_idEmpresa';
  idComandaKey: string = '_idComanda';

  constructor(
    private qrScanner: QRScanner,
    private ref: ChangeDetectorRef,
    private modalController: ModalController,
    private _authService: AuthService,
    db: AngularFirestore) {

    this.storage = localStorage;

    this.clienteCollection = db.collection<Cliente>('Cliente').doc(this._authService.authenticatedUser.uid).collection<Comanda>('Comanda');

    this.clienteCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comanda;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    /*.subscribe(data => {
      this.comandas = data;

      let comandaAberta = this.comandas.filter(a => a.status == StatusComanda.Aberta);

      if (comandaAberta.length == 0) {
        this.lerQrCode();
      }
      else {
        this.abrirModalCardapio();
      }
    });
    */
  }

  ngOnInit() {
  }

  lerQrCode() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        // Se a camera estiver permitida.
        if (status.authorized) {

          this.qrScanner.show();
          window.document.querySelector('ion-app').classList.add('transparent-body');

          // Começa a scannear
          let scanSub = this.qrScanner.scan().subscribe(
            // A variável text abaixo é o retorno da leitura do QR.
            (text: string) => {

              let retorno: string[] = text.split(':');
              this.storage.setItem(this.idEmpresaKey, retorno[0]);
              this.storage.setItem(this.idComandaKey, retorno[1]);

              this.criarComanda(); // Cliente -> Comanda

              this.qrScanner.hide(); // Esconde o preview da camera
              scanSub.unsubscribe(); // Para de Scann
              window.document.querySelector('ion-app').classList.remove('transparent-body');

              this.abrirModalCardapio();

              this.ref.detectChanges();
            });

        } else if (status.denied) {
          // Se a permissão de camera não estiver aplicada, pode colocar a lógica aqui.
        } else {
          // permissão negada para a camera, tem que perguntar de novo depois
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  async abrirModalComanda() {
    const modal = await this.modalController.create({
      component: EComandaComponent
    });

    return await modal.present();
  }

  async abrirModalCardapio() {
    const modal = await this.modalController.create({
      component: CardapioComponent,
      componentProps: {
        'idEmpresa': this.storage.getItem(this.idEmpresaKey)
      }
    });

    return await modal.present();
  }

  criarComanda() {
    // Lógica para criar comanda.
  }
}
