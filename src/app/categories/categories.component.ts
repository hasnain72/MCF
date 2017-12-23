import { Component, OnInit } from '@angular/core';

import { CategoryService } from './shared/category.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers : [CategoryService]
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
  }

}
