import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form : NgForm) {
    if(form.value.$key == null)
      this.categoryService.insertCategory(form.value);
    else
      this.categoryService.updateCategory(form.value);
    this.resetForm(form);
  }

  resetForm(form? : NgForm) {
    if(form!=null) 
      form.reset();
    this.categoryService.selectedCategory = {
      $key : null,
      cat_desc: '',
      cat_id : '',
      cat_image : '',
      cat_name : '',
      parent_id : '',
    }
  }

  onDelete(form : NgForm) {
    if(confirm('Are you sure to deleter this record ?')==true) {
      this.categoryService.deleteCategory(form.value.$key);
      this.resetForm(form);
    }
  }
}
