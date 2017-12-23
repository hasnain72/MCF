import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';
import { get } from 'https';

import { StoresService } from './shared/stores.service';
import { Stores } from './shared/stores.model';
import { Products } from './shared/products.model';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers : [StoresService]
})
export class StoresComponent implements OnInit {

  lat: number = 22.5760925;
  lng: number = 43.02712109375001;

  constructor(private scusersService : StoresService) { }
  sbusersList : Stores[];
  single_store : Stores;
  productsList : Products[];
  single_product : Products;
  active = 1;
  num : number = 1;
  name : string = '';
  selectedElement:any= {id:-1,Name:''};
  activeSbuser = 1;
  pausedSbuser = 2;
  notVerified = 0;
  values : any[] = [
    { id: 1, name: "All" },
    { id: 2, name: "New" }
  ]; 

  productSelectValues : any[] = [
    { id: 1, name: "All" },
    { id: 2, name: "New" },
    { id: 3, name: "Active" },
    { id: 4, name: "Paused" }
  ]; 
 
  abc : string;

  loc : any[] = [
    { name: "All" },
    { name: "Shall" }
  ]; 
  
  store_id = null;


  ngOnInit() {
    this.selectedElement = {id:-1,Name:'Select One'};
    if(this.store_id!=null) {
      var x = this.scusersService.getProduct(this.store_id);
      x.snapshotChanges().subscribe(item =>{
        this.productsList = [];
        item.forEach(element=> {
          var y = element.payload.toJSON();
          this.single_product = y as Products;
          if(this.num == 1 || this.num == 2) {
            if( this.name != null) {
              if(this.single_product.product_name.includes(this.name)) {
                y["$key"] = element.key;
                this.productsList.push(y as Products);
              }
            }
            else{
              y["$key"] = element.key;
              this.productsList.push(y as Products);
            }
          }
          else if(this.num == 3) {
            if( this.name != null) {
              if(this.single_product.status == "1" && this.single_product.product_name.includes(this.name)) {
                y["$key"] = element.key;
                this.productsList.push(y as Products);
              }
            }
            else if (this.single_product.status == "1"){
              y["$key"] = element.key;
              this.productsList.push(y as Products);
            }
          }
          else if(this.num == 4) {
            if( this.name != null) {
              if(this.single_product.status == "2" && this.single_product.product_name.includes(this.name)) {
                y["$key"] = element.key;
                this.productsList.push(y as Products);
              }
            }
            else if (this.single_product.status == "2"){
              y["$key"] = element.key;
              this.productsList.push(y as Products);
            }
          }
        });
        if(this.num == 2) {
          this.productsList = this.productsList.reverse();
        }
      });
    }

    this.selectedElement = {id:-1,Name:'Select One'};   
    var x = this.scusersService.getData(this.num);
    x.snapshotChanges().subscribe(item =>{
      this.sbusersList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        this.single_store = y as Stores;

        /* var arr = this.single_store.location.split(',');
        this.lat = +arr[0];
        this.lng = +arr[1];
        var LatLng = new google.maps.LatLng(+arr[0], +arr[1]);  
        var geocoder = new google.maps.Geocoder;
        getGeocodeAndProcess(LatLng); 
        var yar:String;
        function getGeocodeAndProcess(aaa) {
          //console.log("came");
          getGeocode(aaa, (results) =>{
            var self = this;
            var g_lat = results[0].formatted_address;
            //this.loc.push({name:g_lat});
            //console.log(this.loc.pop().name);
            console.log(g_lat);
            //this.abc = g_lat;
            this.yar = g_lat;
            return g_lat;
          });
        }
       
        function getGeocode(address, callback) {
          geocoder.geocode({'location': LatLng}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                var def = results[0].formatted_address;
                //console.log(def);  
                callback(results);
              } 
              else {
                window.alert('No results found');
              }
            } 
            else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });  
        }
        //console.log(this.abc);  
        //this.loc.push({name:this.abc}); */
        if( this.name != null) {
          console.log(this.name);
          if(this.single_store.title.includes(this.name)) {
            y["$key"] = element.key;
            this.sbusersList.push(y as Stores);  
          }
        }
        else {
          y["$key"] = element.key;
          this.sbusersList.push(y as Stores);
        }
      });
      if(this.num == 2) {
        this.sbusersList = this.sbusersList.reverse();
      }
    });
  }
  onDelete(sbusers : Stores) {
    if(confirm('Are you sure to delete this Business User ?')==true) {
      this.scusersService.deleteSbuser(sbusers.$key);
    }
  }
  ActivateProduct(sbusers : Products) {
    this.scusersService.ActivateProduct(sbusers.$key);
  }
  PauseProduct(sbusers : Products) {
    this.scusersService.PauseProduct(sbusers.$key);
  }
  
  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    console.log(newVal);
    this.num = newVal;
    this.name = "";
    this.ngOnInit();
  }

  public onChangeProduct(event): void {  // event will give you full breif of action
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
    this.scusersService.selectedSbuser = {
      $key : null,
      business_user_id : '',
      cat_id : '',
      created_at : '',
      location : '',
      store_id : '',
      title : '',
    }
  }
  back() {
    this.active = 1;  
    this.productsList = null;
  }
  onItemClick(store : Stores) {
    this.scusersService.getProduct(store.store_id);
    console.log(store.store_id);
    this.store_id = store.store_id;
    this.active = 0; 
    this.ngOnInit();
    //this.userService.selectedUser = usr; // Instead of real reference we just pass copy of object because otherwise it will affect the performance of site
    //this.categoryService.selectedCategory = Object.assign({},category);
  }
}
