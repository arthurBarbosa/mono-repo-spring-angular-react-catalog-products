import { ReadCategoriesComponent } from './components/categories/read-categories/read-categories.component';
import { CreateCategoriesComponent } from './components/categories/create-categories/create-categories.component';
import { HomeComponent } from './components/views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/create', component: CreateCategoriesComponent},
  {path: 'categories/all', component: ReadCategoriesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
