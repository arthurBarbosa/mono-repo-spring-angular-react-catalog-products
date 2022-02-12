import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { HomeComponent } from './components/views/home/home.component';
import { MatCardModule} from   '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateCategoriesComponent } from './components/categories/create-categories/create-categories.component';
import { ReadCategoriesComponent } from './components/categories/read-categories/read-categories.component';

import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UpdateCategoriesComponent } from './components/categories/update-categories/update-categories.component';
import { DeleteCategoriesComponent } from './components/categories/delete-categories/delete-categories.component';
import { SecurityComponent } from './components/security/security.component';
import { AuthGuardInterceptor } from './guards/auth.guard.interceptor';
import { UsersComponent } from './components/users/users.component';
import { UsersCreateComponent } from './components/users/users-create/users-create.component';


registerLocaleData(localept);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CategoriesComponent,
    CreateCategoriesComponent,
    ReadCategoriesComponent,
    UpdateCategoriesComponent,
    DeleteCategoriesComponent,
    SecurityComponent,
    UsersComponent,
    UsersCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule
     
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthGuardInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
