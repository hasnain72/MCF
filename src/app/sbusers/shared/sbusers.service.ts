import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Sbusers } from './sbusers.model';
import { UserOrders } from './user-orders.model';

@Injectable()
export class SbusersService {
  sbusersList : AngularFireList<any>;
  selectedSbuser : Sbusers = new Sbusers();
  userOrderList : AngularFireList<any>;
  selectedOrder : UserOrders = new UserOrders();

  constructor(private firebase : AngularFireDatabase) { }
  
  getData() {
    this.sbusersList = this.firebase.list('/user'); 
    return this.sbusersList;
  }
  getOrders(key : string,userType: number) {
    if(key == "" || key == null) {
    }
    else if(userType == 1) {
      this.userOrderList = this.firebase.list('/order', ref => ref.orderByChild('business_id').equalTo(key));
    }
    else if(userType == 2) {
      this.userOrderList = this.firebase.list('/order', ref => ref.orderByChild('customer_id').equalTo(key));
    }
    else if(userType == 3) {
      this.userOrderList = this.firebase.list('/order', ref => ref.orderByChild('resource_pid').equalTo(key));
    }
    return this.userOrderList;
  }
  deleteSbuser(key : string) {
    //this.sbusersList.remove(key);
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
}