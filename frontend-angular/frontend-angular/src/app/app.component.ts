import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth.service';

@Component({
  selector: 'app-root',
   templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'frontend-angular';

  showMenu: boolean ;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.checkShowMenu();
  }

  checkShowMenu(){
    this.authService.showMenu.subscribe(
      show => this.showMenu = show
    )
  }
}
