import { DeleteCategoriesComponent } from './components/categories/delete-categories/delete-categories.component';
import { UpdateCategoriesComponent } from './components/categories/update-categories/update-categories.component';
import { ReadCategoriesComponent } from './components/categories/read-categories/read-categories.component';
import { CreateCategoriesComponent } from './components/categories/create-categories/create-categories.component';
import { HomeComponent } from './components/views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SecurityComponent } from './components/security/security.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: SecurityComponent},
  {path: 'login', component: SecurityComponent},
  {path: 'categories', component: CategoriesComponent, canActivate:[AuthGuard]},
  {path: 'categories/create', component: CreateCategoriesComponent, canActivate:[AuthGuard]},
  {path: 'categories/all', component: ReadCategoriesComponent,  canActivate:[AuthGuard]},
  {path: 'categories/update/:id', component: UpdateCategoriesComponent,  canActivate:[AuthGuard]},
  {path: 'categories/delete/:id', component: DeleteCategoriesComponent, canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
