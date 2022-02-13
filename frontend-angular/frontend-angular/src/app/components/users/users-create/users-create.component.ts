import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  registerForm: FormGroup;
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private userService: UsersService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  onFormSubmit():void{
    this.isLoadingResults = true;
    this.userService.createUser(this.registerForm.value)
      .subscribe((res: any) => {
        this.router.navigate(['/users']).then(_=> console.log('You are registered now!'))
      },
      (err: any) => {
        console.log(err);
      });
      
    
  }

}
