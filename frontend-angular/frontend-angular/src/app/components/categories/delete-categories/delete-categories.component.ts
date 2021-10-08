import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { CategoryModel } from './../category-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.scss']
})
export class DeleteCategoriesComponent implements OnInit {
  
  category: CategoryModel = new CategoryModel();
  
  constructor(private categoryService:CategoryService,
              private router:Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.readById(id).subscribe(response => {
      this.category = response;
    });
  }

  deleteCategory(){
    this.categoryService.delete(`${this.category.id}`).subscribe(() => {
      this.categoryService.showMessage("Categoria excluída com sucesso!", true);
      this.router.navigate(['/categories/all']);
    })
  }

  cancel() {
    this.router.navigate(['categories/all'])
  }

}
