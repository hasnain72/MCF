import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Orders } from './orders.model';

@Injectable()
export class OrdersService {
  sbusersList : AngularFireList<any>;
  selectedSbuser : Orders = new Orders();
  constructor(private firebase : AngularFireDatabase) { }

  getData(num:number,name?:string) {
    this.sbusersList = this.firebase.list('/order');
    return this.sbusersList;
  }
  deleteSbuser(key : string) {
    this.sbusersList.remove(key);
  }
  ActivateStatus(key : string) {
    this.sbusersList.update(key,{
      order_status: "1"
    })
  }
  PauseStatus(key : string) {
    this.sbusersList.update(key,{
      order_status: "2"
    })
  }
}
