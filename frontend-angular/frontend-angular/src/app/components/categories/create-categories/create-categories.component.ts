import { CategoryService } from './../category.service';
import { CategoryModel } from './../category-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  
  category: CategoryModel = new CategoryModel();
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  createCategories(){
    this.categoryService.create(this.category).subscribe(() => {
      this.categoryService.showMessage("Categoria salva com sucesso", true);
    })
  }

}
