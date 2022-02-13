import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentChecked, Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  message = '';
  isLoadingResults = false;
  isDarkTheme: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router:Router,
    public loaderService: LoaderService,
    private changeDetector: ChangeDetectorRef) { }
  

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
