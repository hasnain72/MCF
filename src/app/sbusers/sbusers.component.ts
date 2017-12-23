import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

import { SbusersService } from './shared/sbusers.service';
import { Sbusers } from './shared/sbusers.model';
import { UserOrders } from './shared/user-orders.model';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sbusers',
  templateUrl: './sbusers.component.html',
  styleUrls: ['./sbusers.component.css'],
  providers : [SbusersService]
})
export class SbusersComponent implements OnInit {
  constructor(private sbusersService : SbusersService) { }

  sbusersList : Sbusers[];
  single_user : Sbusers;
  ordersList : UserOrders[];
  single_order : UserOrders;
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
  active = 1;

  ordersSelectValues : any[] = [
    { id: 1, name: "All" },
    { id: 2, name: "New" },
    { id: 3, name: "Pending" },
    { id: 4, name: "Active" },
    { id: 4, name: "Delivered" }
  ]; 

  user_id = null;

  ngOnInit() {
    this.selectedElement = {id:-1,Name:'Select One'};

    if(this.user_id!=null) {
      var x = this.sbusersService.getOrders(this.user_id,1);
      x.snapshotChanges().subscribe(item =>{
        this.ordersList = [];
        item.forEach(element=> {
          var y = element.payload.toJSON();
          this.single_order = y as UserOrders;
          if(this.num == 1 || this.num == 2) {
            y["$key"] = element.key;
            this.ordersList.push(y as UserOrders);
          }
          else if(this.num == 3) {
            if(this.single_order.order_status == "0") {
              y["$key"] = element.key;
              this.ordersList.push(y as UserOrders);
            }
          }
          else if(this.num == 4) {
            if(this.single_order.order_status == "1") {
              y["$key"] = element.key;
              this.ordersList.push(y as UserOrders);
            }
          }
          else if(this.num == 5) {
            if(this.single_order.order_status == "2") {
              y["$key"] = element.key;
              this.ordersList.push(y as UserOrders);
            }
          }
        });
        if(this.num == 2) {
          this.ordersList = this.ordersList.reverse();
        }
      });
    }


    var x = this.sbusersService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.sbusersList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        this.single_user = y as Sbusers;
        if(this.num == 1 || this.num == 2) {
          if( this.name != null) {
            if(this.single_user.user_type == "Business" && this.single_user.name.includes(this.name)) {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Business"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 3 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Business" && this.single_user.name.includes(this.name) && this.single_user.status == "1") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Business" && this.single_user.status == "1"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 4 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Business" && this.single_user.name.includes(this.name) && this.single_user.status == "2") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Business" && this.single_user.status == "2"){
            y["$key"] = element.key;
            this.sbusersList.push(y as Sbusers);  
          }
        }
        else if(this.num == 5 ){
          if( this.name != null) {
            if(this.single_user.user_type == "Business" && this.single_user.name.includes(this.name) && this.single_user.status == "0") {
              y["$key"] = element.key;
              this.sbusersList.push(y as Sbusers);  
            }
          }
          else if(this.single_user.user_type == "Business" && this.single_user.status == "0"){
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
      this.sbusersService.deleteSbuser(sbusers.$key);
    }
  }
  Activate(sbusers : Sbusers) {
    this.sbusersService.ActivateStatus(sbusers.$key);
  }
  Pause(sbusers : Sbusers) {
    this.sbusersService.PauseStatus(sbusers.$key);
  }
  Authenticate(sbusers : Sbusers) {
    if(confirm('Are you sure to Authenticate this Business User ?')==true) {
      this.sbusersService.PauseStatus(sbusers.$key);
    }
  }
  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    this.num = newVal;
    this.name = null;
    this.ngOnInit(); 
  }
  public onChangeOrder(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    this.num = newVal;
    this.name = "";
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
    this.sbusersService.selectedSbuser = {
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
  back() {
    this.active = 1;  
    this.ordersList = null;
  }

  onItemClick(sbusers : Sbusers) {
    //this.sbusersService.getOrders(sbusers.user_id,1);
    console.log(sbusers.user_id);
    this.user_id = sbusers.user_id;
    this.active = 0; 
    this.ngOnInit();
    //this.userService.selectedUser = usr; // Instead of real reference we just pass copy of object because otherwise it will affect the performance of site
    //this.categoryService.selectedCategory = Object.assign({},category);
  }
}