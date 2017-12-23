import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database'

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { element } from 'protractor';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categoryList : Category[];
  showSpinner : boolean = true;
  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    var x = this.categoryService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.categoryList = [];
      item.forEach(element=> {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.categoryList.push(y as Category);
      });
    });
    this.showSpinner=false;
  }

  onItemClick(category : Category) {
    //this.userService.selectedUser = usr; // Instead of real reference we just pass copy of object because otherwise it will affect the performance of site
    this.categoryService.selectedCategory = Object.assign({},category);
  }
}
