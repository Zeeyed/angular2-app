import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService{
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private af:AngularFire){}

  getBusiness(category: string = null){
    if(category != null && category != "default"){
      this.businesses = this.af.database.list('/contacts', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      }) as FirebaseListObservable<Business[]>
    }else{
      this.businesses = this.af.database.list('/contacts') as FirebaseListObservable<Business[]>
    }
    return this.businesses;
  }

  getCategories(){
    this.categories = this.af.database.list('/categories') as FirebaseListObservable<Category[]>
    return this.categories;
  }

  addBusiness(newBusiness){
    return this.businesses.push(newBusiness);
  }

  updateBusiness(key, updBusiness){
    return this.businesses.update(key, updBusiness);
  }

  deleteBusiness(key){
    this.businesses.remove(key);
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
