import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService{
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private af:AngularFire){}

  getBusiness(){
    this.businesses = this.af.database.list('/contacts') as FirebaseListObservable<Business[]>
    return this.businesses;
  }

  getCategories(){
    this.categories = this.af.database.list('/categories') as FirebaseListObservable<Category[]>
    return this.categories;
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
