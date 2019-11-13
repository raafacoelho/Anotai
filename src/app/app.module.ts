import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule,
    FormsModule,
    ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
