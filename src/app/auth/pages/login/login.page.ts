import { OverlayService } from './../../../core/services/overlay.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, Platform, AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  FB_APP_ID: number = 2443079689293615;

  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar Conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private face: Facebook,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController,

    private authService: AuthService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl {
    return  this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return  this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return  this.authForm.get('password') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Inscreva-se';
    this.configs.actionChange = isSignIn ? 'Criar Conta' : 'Já possuo uma conta';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });

      this.authService.saveLocalUser(credentials.user);

      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/home');
    } catch (e) {
      console.log('Auth error: ', e);
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }

  async doFbLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    // the permissions your facebook app needs from the user
    const permissions = ['public_profile', 'email'];

    this.face.login(permissions)
    .then(response => {
      let userId = response.authResponse.userID;
      // Getting name and email properties
      // Learn more about permissions in https://developers.facebook.com/docs/facebook-login/permissions

      this.face.api('/me?fields=name,email', permissions)
      .then(user => {
        user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
        // now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('facebook_user',
        {
          name: user.name,
          email: user.email,
          picture: user.picture
        })
        .then(() => {
          this.router.navigate(['/home']);
          loading.dismiss();
        }, error => {
          console.log(error);
          loading.dismiss();
        });
      });
    }, error => {
      console.log(error);
      if (!this.platform.is('cordova')) {
        this.presentAlert();
      }
      loading.dismiss();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }


}
