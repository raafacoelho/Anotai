import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { PagamentoComponent } from './pagamento/pagamento.component';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

  public retornoQR: string = "Ainda não leu o QR.";

  constructor(private qrScanner: QRScanner,
              private ref: ChangeDetectorRef,
              private modalController: ModalController) { }

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

              this.retornoQR = text;

              this.qrScanner.hide(); // Esconde o preview da camera
              scanSub.unsubscribe(); // Para de Scann
              window.document.querySelector('ion-app').classList.remove('transparent-body');
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

<<<<<<< HEAD
  async abrirModalPagamento(){
=======
  async abrirModalPagamento() {
>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5

    const modal = await this.modalController.create({
      component: PagamentoComponent
    });
<<<<<<< HEAD
    
=======

>>>>>>> 65835afca1f680e5473c7dfe0463bb78c91644e5
    return await modal.present();
  }
}
