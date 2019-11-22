import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PayPalConfiguration, PayPalPayment, PayPal } from '@ionic-native/paypal/ngx';
import { environment } from 'src/environments/environment';
import { PaypalPaymentResponse } from '../model/paypal/paypal-payment-response.model';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  valorTotal: number = 15.67;
  retornoPaypal: string = "";

  constructor(private navCtrl: NavController,
              private payPal: PayPal) { }

  ngOnInit() {
  }

  Back() {
    this.navCtrl.navigateBack("/home/tabs/comanda")
  }

  pagarComPaypal(){
    console.log(environment.paypalEnvironment);
    console.log(environment.paypalClientId);
    this.payPal.init({
      PayPalEnvironmentProduction: environment.paypalClientId,
      PayPalEnvironmentSandbox: environment.paypalClientId
    }).then(() => {
      
      this.payPal.prepareToRender(environment.paypalEnvironment, new PayPalConfiguration({
        
      })).then(() => {
        let payment = new PayPalPayment(this.valorTotal.toString(), 'BRL', 'Descrição da venda', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          
          switch((<PaypalPaymentResponse>res).response.state) { 
            case "approved": { 
                // Lógica de quando a transação é aprovada.
                this.retornoPaypal = JSON.stringify(res); 
               break; 
            }
            default: { 
               // Lógica de quando é diferente de aprovado.
               break; 
            } 
         } 
          console.log(res);
        }, () => {
          // Lógica de erro de renderização ou tela de pagamento fechada.
        });
      }, () => {
        // Lógica de erro na configuração.
      });
    }, () => {
      // Lógica de inicialização.
    });
  }
}
