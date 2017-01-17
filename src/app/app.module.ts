import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthService } from './auth.service';


export const firebaseConfig = {
  apiKey: 'AIzaSyCGpkfxZJhOgsitZ6itKSEGS94zemJJtQk',
  authDomain: 'angular2-app-fd7c5.firebaseapp.com',
  databaseURL: 'https://angular2-app-fd7c5.firebaseio.com',
  storageBucket: 'angular2-app-fd7c5.appspot.com',
  messagingSenderId: '341902767954'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
