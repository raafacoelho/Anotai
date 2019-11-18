import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  Back() {
    this.navCtrl.navigateBack("/home/tabs/comanda")
  }

}
