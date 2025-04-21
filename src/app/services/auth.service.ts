import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkTokenExpiration();
  }
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private tokenExpirationTimer: any;

  // Mock credentials for demo (replace with actual API calls in production)
  private readonly MOCK_USERS = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
  ];



  isLoggedIn(): boolean {
    return this.hasToken();
  }

  login(username: string, password: string): Observable<any> {
    // For demo purposes - replace with actual API call
    const user = this.MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      return of({
        token: 'mock-jwt-token',
        expiresIn: 600, // 1 hour
        user: { username: user.username }
      }).pipe(
        delay(800), // Simulate network request
        tap(response => this.handleAuthentication(response))
      );
    } else {
      return throwError(() => new Error('Invalid credentials')).pipe(
        delay(800) // Simulate network request
      );
    }

    // Real implementation would be:
    // return this.http.post<any>('/api/auth/login', { username, password })
    //   .pipe(
    //     tap(response => this.handleAuthentication(response))
    //   );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('user_data');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getLoggedInUser(): any {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  private handleAuthentication(response: any): void {
    const { token, expiresIn, user } = response;

    // Set expiration time (current time + expiresIn seconds)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem('auth_token', token);
    localStorage.setItem('token_expiration', expirationDate.toISOString());
    localStorage.setItem('user_data', JSON.stringify(user));

    this.loggedIn.next(true);
    this.setAutoLogout(expiresIn * 1000);
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('auth_token');
    const expiration = localStorage.getItem('token_expiration');

    if (!token || !expiration) {
      return false;
    }

    return new Date() < new Date(expiration);
  }

  private checkTokenExpiration(): void {
    if (this.hasToken()) {
      const tokenExpiration = localStorage.getItem('token_expiration');

      // Make sure tokenExpiration is not null before creating a Date
      if (tokenExpiration) {
        const expiration = new Date(tokenExpiration);
        const expiresIn = expiration.getTime() - new Date().getTime();

        this.setAutoLogout(expiresIn);
      }
    }
  }

  private setAutoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
