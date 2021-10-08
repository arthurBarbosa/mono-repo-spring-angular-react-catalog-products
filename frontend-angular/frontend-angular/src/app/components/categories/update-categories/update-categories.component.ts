import { CategoryModel } from './../category-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {

  category: CategoryModel;
  constructor(private categoryService:CategoryService,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.readById(id).subscribe(response => {
      this.category = response
    });
  }
  updateCategories(){
    this.categoryService.update(this.category).subscribe(() => {
      this.categoryService.showMessage("Categoria alterada com sucesso", true);
      this.router.navigate(['/categories'])
    })
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
