import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

import { SbusersService } from '../sbusers/shared/sbusers.service';
import { Sbusers } from '../sbusers/shared/sbusers.model';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-scusers',
  templateUrl: './scusers.component.html',
  styleUrls: ['./scusers.component.css'],
  providers : [SbusersService]
})
export class ScusersComponent implements OnInit {
  constructor(private scusersService : SbusersService) { }

  sbusersList : Sbusers[];
  single_user : Sbusers;
  num : number = 1;
  name : string = null;
  selectedElement:any= {id:-1,Name:''};
  activeSbuser = 1;
  pausedSbuser = 2;
  notVerified = 0;
  values : any[] = [
    { id: 1, name: "All" },
    { id: 2, name: "New" },
    { id: 3, name: "Active" },
    { id: 4, name: "Paused" },
    { id: 5, name: "Non-Authenticated" } 
  ]; 

  ngOnInit() {
    this.selectedElement = {id:-1,Name:'Select One'};
    var x = this.scusersService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.sbusersList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        this.single_user = y as Sbusers;
        if(this.num == 1 || this.num == 2) {
          if( this.name != null) {
            if(this.single_user.user_type == "Customer" && this.single_user.name.includes(this.name)) {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Customer"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 3 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Customer" && this.single_user.name.includes(this.name) && this.single_user.status == "1") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Customer" && this.single_user.status == "1"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 4 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Customer" && this.single_user.name.includes(this.name) && this.single_user.status == "2") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Customer" && this.single_user.status == "2"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 5 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Customer" && this.single_user.name.includes(this.name) && this.single_user.status == "0") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Customer" && this.single_user.status == "0"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
      });
      if(this.num == 2) {
        this.sbusersList = this.sbusersList.reverse();
      }
    });
  }
  onDelete(sbusers : Sbusers) {
    if(confirm('Are you sure to delete this Business User ?')==true) {
      this.scusersService.deleteSbuser(sbusers.$key);
    }
  }
  Activate(sbusers : Sbusers) {
    this.scusersService.ActivateStatus(sbusers.$key);
  }
  Pause(sbusers : Sbusers) {
    this.scusersService.PauseStatus(sbusers.$key);
  }
  Authenticate(sbusers : Sbusers) {
    if(confirm('Are you sure to Authenticate this Business User ?')==true) {
      this.scusersService.PauseStatus(sbusers.$key);
    }
  }
  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    this.num = newVal;
    this.name = null;
    this.ngOnInit();
  }
  onSubmit(form : NgForm) {
    this.name = form.value.search;
    console.log(this.name);
    this.ngOnInit();
  }
  resetForm(form? : NgForm) {
    if(form!=null) {
      form.reset();
    }
    this.selectedElement = {id:-1,Name:'Select One'};
    this.scusersService.selectedSbuser = {
      $key : null,
      account_number : '',
      created_at : '',
      credit_card : '',
      email : '',
      location : '',
      mobile_no : '',
      name : '',
      otp_code : '',
      password : '',
      password_key : '',
      status : '',
      user_id : '',
      user_type : '',
      wallet : '',
    }
    this.name = null;
    this.ngOnInit();
  }
}
