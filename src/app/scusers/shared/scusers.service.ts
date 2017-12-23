import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Scusers } from './scusers.model';

@Injectable()
export class ScusersService {
  sbusersList : AngularFireList<any>;
  selectedSbuser : Scusers = new Scusers();

  constructor(private firebase : AngularFireDatabase) { }

  getData(num:number,name?:string) {
    if(num == 1) {
      this.sbusersList = this.firebase.list('/user'); 
    }
    else if(num == 2 ){
      console.log("here");
      this.sbusersList = this.firebase.list('/user', ref => ref.orderByChild('created_at'));
    }
    return this.sbusersList;
  }
  deleteSbuser(key : string) {
    this.sbusersList.remove(key);
  }
  ActivateStatus(key : string) {
    this.sbusersList.update(key,{
      status: 1
    })
  }
  PauseStatus(key : string) {
    this.sbusersList.update(key,{
      status: 2
    })
  }
}
