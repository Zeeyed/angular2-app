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

  activeCategory: string;
  activeCompany: string;
  activeYearsInBusiness: string;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeCity: string;
  activeState: string;
  activeZipcode: string;

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

  changeState(state, key = null){
    if(key){
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category){
    this._firebaseService.getBusiness(category).subscribe(businesses => {
      this.businesses = businesses;
    })
  }

  addBusiness(
    company: string,
    description: string,
    category: string,
    years_in_business: string,
    street_address: string,
    city: string,
    state: string,
    email: string,
    zipcode: string,
    phone: string
  ){
    var created_at = new Date().toString();

    var newBusiness = {
      company: company,
      description: description,
      category: category,
      years_in_business: years_in_business,
      street_address: street_address,
      city: city,
      state: state,
      email: email,
      zipcode: zipcode,
      phone: phone,
      created_at: created_at
    }
    console.log(newBusiness);

    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default');
  }

  showEdit(business){
    this.changeState('edit', business.$key);
    this.activeCategory = business.category;
    this.activeCompany = business.company;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeDescription = business.description;
    this.activePhone = business.phone;
    this.activeEmail = business.email;
    this.activeStreetAddress = business.street_address;
    this.activeCity = business.city;
    this.activeState = business.state;
    this.activeZipcode = business.zipcode;
  }

  updateBusiness() {
    var updBusiness = {
      company: this.activeCompany,
      category: this.activeCategory,
      years_in_business: this.activeYearsInBusiness,
      description: this.activeDescription,
      phone: this.activePhone,
      email: this.activeEmail,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      state: this.activeState,
      zipcode: this.activeZipcode
    }

    this._firebaseService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default');
  }

  deleteBusiness(key){
    this._firebaseService.deleteBusiness(key);
    this.changeState('default');
  }
  ngOnInit() {
    this.appState = 'default';
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
