import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

import { OrdersService } from './shared/orders.service';
import { Orders } from './shared/orders.model';
import { Sbusers } from '../sbusers/shared/sbusers.model';
import { SbusersService } from '../sbusers/shared/sbusers.service';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers : [OrdersService,SbusersService], 
})
export class OrdersComponent implements OnInit {
  lat: number = 22.5760925;
  lng: number = 43.02712109375001;

  constructor(private sbusersService : OrdersService , private sbuserNameService : SbusersService) { }
  sbusersList : Orders[];
  sbuserNameList: Sbusers[];
  single_order : Orders;
  single_user : Sbusers;
  num : number = 1;
  name : string = '';
  selectedElement:any= {id:-1,Name:''};
  activeSbuser = 1;
  pausedSbuser = 2;
  notVerified = 0;
  values : any[] = [
    { id: 1, name: "All" },
    { id: 2, name: "New" },
    { id: 3, name: "Pending" },
    { id: 4, name: "Active" },
    { id: 5, name: "Delievered" } 
  ]; 

  ngOnInit() {
    /*this.selectedElement = {id:-1,Name:'Select One'};
    var x = this.sbuserNameService.getData(this.num);
    x.snapshotChanges().subscribe(item =>{
      this.sbuserNameList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        this.single_user = y as Sbusers;
        //console.log(this.single_user.name);
        //console.log(this.single_user.user_id);
        y["$key"] = element.key;
        this.sbuserNameList.push(y as Sbusers);
      });
    });*/

    //console.log(this.sbuserNameList);

    if(this.name != '' || this.name!= null) {
      var x = this.sbusersService.getData(this.num,this.name);
    }
    else {
      var x = this.sbusersService.getData(this.num);
    }
    x.snapshotChanges().subscribe(item =>{
      this.sbusersList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        this.single_order = y as Orders;

        //console.log(this.single_order.order_location);
        /*var x = this.sbuserNameService.getData(this.num);
        x.snapshotChanges().subscribe(item =>{
          this.sbuserNameList = [];
          item.forEach(element=> {
            var y = element.payload.toJSON();
            this.single_user = y as Sbusers;
            if(this.single_user.user_id == this.single_order.customer_id && this.single_user.user_type=="Customer") {
              console.log(this.single_user.name);
              console.log(this.single_user.user_id);
              console.log(this.single_order.customer_id);
            }
            if(this.single_user.user_id == this.single_order.business_id && this.single_user.user_type=="Business") {
              console.log(this.single_user.name);
              console.log(this.single_user.user_id);
              console.log(this.single_order.customer_id);
            }
            if(this.single_user.user_id == this.single_order.resource_pid && this.single_user.user_type=="Resource") {
              console.log(this.single_user.name);
              console.log(this.single_user.user_id);
              console.log(this.single_order.customer_id);
            }
            y["$key"] = element.key;
            this.sbuserNameList.push(y as Sbusers);
          });
        }); */
        if(this.num == 1 || this.num == 2) {
          y["$key"] = element.key;
          this.sbusersList.push(y as Orders);  
        }
        else if(this.num == 3) {
          if(this.single_order.order_status == "0") {
            y["$key"] = element.key;
            this.sbusersList.push(y as Orders);
          }  
        }
        else if(this.num == 4) {
          if(this.single_order.order_status == "1") {
            y["$key"] = element.key;
            this.sbusersList.push(y as Orders);
          }  
        }
        else if(this.num == 5) {
          if(this.single_order.order_status == "2") {
            y["$key"] = element.key;
            this.sbusersList.push(y as Orders);
          }  
        }
      });
      if(this.num == 2) {
        this.sbusersList = this.sbusersList.reverse();
      }
    });
  }
  onDelete(sbusers : Orders) {
    if(confirm('Are you sure to delete this Business User ?')==true) {
      this.sbusersService.deleteSbuser(sbusers.$key);
    }
  }
  Activate(sbusers : Orders) {
    this.sbusersService.ActivateStatus(sbusers.$key);
  }
  Pause(sbusers : Orders) {
    this.sbusersService.PauseStatus(sbusers.$key);
  }
  Authenticate(sbusers : Orders) {
    if(confirm('Are you sure to Authenticate this Business User ?')==true) {
      this.sbusersService.PauseStatus(sbusers.$key);
    }
  }
  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    this.num = newVal;
    this.name = "";
    this.ngOnInit();
  }
  onSubmit(form : NgForm) {
      this.name = form.value;
      this.ngOnInit();
  }
  resetForm(form? : NgForm) {
    if(form!=null) {
      form.reset();
    }
    this.selectedElement = {id:-1,Name:'Select One'};
    this.sbusersService.selectedSbuser = {
      $key : null,
      business_id : '',
      customer_id : '',
      customer_token : '',
      delivery_time : '',
      discount : '',
      no_of_products : '',
      order_id : '',
      order_location : '',
      order_status : '',
      order_time : '',
      read : '',
      resource_pid : '',
      store_location : '',
      total_price : '',
    }
  }
}
