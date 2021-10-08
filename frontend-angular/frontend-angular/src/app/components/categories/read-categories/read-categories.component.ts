import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-read-categories',
  templateUrl: './read-categories.component.html',
  styleUrls: ['./read-categories.component.scss']
})
export class ReadCategoriesComponent implements OnInit {

  category: CategoryModel ;
  categories: CategoryModel[] = [];
  displayedColumns = ['id', 'name'];

  totalElements = 0;
  page = 0;
  size = 6;
  pageSizeOptions: number[] = [6]

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories(this.page, this.size)
  }

  getAllCategories(page = 0, size = 0){
    this.categoryService.read(page, size).subscribe(response => {
      this.categories = response['content'];
      this.totalElements = response['totalElements'];
      this.page = response['number'];
    })
  }

  paginator(event: PageEvent){
    this.page = event.pageIndex;
    this.getAllCategories(this.page, this.size);
  }

}
