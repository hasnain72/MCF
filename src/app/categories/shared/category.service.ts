import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';

import { Category } from './category.model';

@Injectable()
export class CategoryService {
  categoryList : AngularFireList<any>;
  selectedCategory : Category = new Category();

  constructor(private firebase : AngularFireDatabase) { }

  getData() {
    this.categoryList = this.firebase.list('Categories');
    return this.categoryList;
  }
  insertCategory(category : Category) {
    this.categoryList.push({
      cat_desc: category.cat_desc,
      cat_id : category.cat_id,
      cat_image : category.cat_image,
      cat_name : category.cat_name,
      parent_id : category.parent_id
    });
  }

  updateCategory(category : Category) {
    this.categoryList.update(category.$key,{
      cat_desc: category.cat_desc,
      cat_id : category.cat_id,
      cat_image : category.cat_image,
      cat_name : category.cat_name,
      parent_id : category.parent_id
    })
  }

  deleteCategory(key : string) {
    this.categoryList.remove(key);
  }
}
