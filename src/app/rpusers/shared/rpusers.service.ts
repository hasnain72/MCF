import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Rpusers } from './rpusers.model';

@Injectable()
export class RpusersService {
  sbusersList : AngularFireList<any>;
  selectedSbuser : Rpusers = new Rpusers();
  selectedRPuser : Rpusers = new Rpusers();

  constructor(private firebase : AngularFireDatabase) { }
  getData(num?:number) {
    if(num == 1) {
      this.sbusersList = this.firebase.list('/user'); 
    }
    else if(num == 2 ){
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