import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Stores } from './stores.model';
import { Products } from './products.model';

@Injectable()
export class StoresService {
  sbusersList : AngularFireList<any>;
  selectedSbuser : Stores = new Stores();
  storeProudctList : AngularFireList<any>;
  selectedProduct : Products = new Products();

  constructor(private firebase : AngularFireDatabase) { }

  getProduct(key? : string) {
    if(key == "" || key == null) {
    }
    else {
      this.storeProudctList = this.firebase.list('/product', ref => ref.orderByChild('store_id').equalTo(key));
      //this.storeProudctList = this.firebase.list('/product', ref => ref.orderByChild('status'));
    }
    return this.storeProudctList;
  }

  getData(num:number,name?:string) {
    if(num == 1 || num == 2) {
      if(name != '' && name!=null) {
        //console.log(namee.search);
        this.sbusersList = this.firebase.list('/store', ref => ref.orderByChild('title').equalTo(name.search+''));
      }
      else {
        this.sbusersList = this.firebase.list('/store');
      }
    }
    else if(name!=null && name!='' ) {
      this.sbusersList = this.firebase.list('/store', ref => ref.orderByChild('title').equalTo(name.search+''));
    }
    return this.sbusersList;
  }
  deleteSbuser(key : string) {
    this.sbusersList.remove(key);
  }
  ActivateStatus(key : string) {
    this.sbusersList.update(key,{
      status: "1"
    })
  }
  PauseStatus(key : string) {
    this.sbusersList.update(key,{
      status: "2"
    })
  }
  deleteProduct(key : string) {
    this.storeProudctList.remove(key);
  }
  ActivateProduct(key : string) {
    this.storeProudctList.update(key,{
      status: "1"
    })
  }
  PauseProduct(key : string) {
    this.storeProudctList.update(key,{
      status: "2"
    })
  }

}