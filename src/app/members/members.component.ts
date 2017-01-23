import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''},
  providers: [FirebaseService]
})
export class MembersComponent implements OnInit {

  name: any;
  state: string = '';
  businesses : Business[];
  categories : Category[];
  appState: string;
  activeKey: string;

  constructor(public af: AngularFire, private _firebaseService: FirebaseService, private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        console.log(auth.auth.email);
      }
    });

  }

  logout() {
     this.af.auth.logout();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

  changeState(state, key){
    if(key){
      this.activeKey = key;
    }
    this.appState = state;
  }
  ngOnInit() {
    this._firebaseService.getBusiness().subscribe(businesses => {
      this.businesses = businesses;
    })

    this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

}

export interface Business{
  $key?: string;
  company?: string;
  description?: string;
  category: string;
  years_in_business?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  phone?: string;
  email?: string;
  created_at: string;
}

export interface Category{
  $key?: string;
  name?: string;
}
