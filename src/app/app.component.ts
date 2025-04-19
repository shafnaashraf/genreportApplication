import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {HeaderComponent} from './header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    NgClass,
    HeaderComponent,
    RouterOutlet,
    NgIf,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check initial auth state
    this.isLoggedIn = this.authService.isLoggedIn();

    // Subscribe to route changes to update header visibility
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
