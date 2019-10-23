import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.page.html',
  styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

  public RetornoQR: string;

  constructor(private qrScanner: QRScanner) { }

  ngOnInit() {
  }

  lerQrCode() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        // Se a camera estiver permitida.
        if (status.authorized) {

          // Começa a scannear
          let scanSub = this.qrScanner.scan().subscribe(
            // A variável text abaixo é o retorno da leitura do QR.
            (text: string) => {

              this.RetornoQR = text;

              this.qrScanner.hide(); // Esconde o preview da camera
              scanSub.unsubscribe(); // Para de Scann
            });

        } else if (status.denied) {
          // Se a permissão de camera não estiver aplicada, pode colocar a lógica aqui.
        } else {
          // permissão negada para a camera, tem que perguntar de novo depois
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}
