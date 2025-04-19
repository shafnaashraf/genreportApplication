import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgClass, NgIf} from "@angular/common";
@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        NgClass,
    ],
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }
    loginForm!: FormGroup;
    showPassword = false;
    loginInProgress = false;
    loginError = '';



    ngOnInit(): void {
        this.initLoginForm();
        this.checkRememberedUser();

        // Check if user is already logged in
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/job']);
        }
    }

    initLoginForm(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    checkRememberedUser(): void {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            this.loginForm.patchValue({
                username: rememberedUser,
                rememberMe: true
            });
        }
    }

    isFieldInvalid(field: string): boolean {
        const control = this.loginForm.get(field);
        // Using hasError() method which is typically public
        return !!control && control.invalid && (control.dirty);
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            Object.keys(this.loginForm.controls).forEach(field => {
                const control = this.loginForm.get(field);
                if (control) {
                    control.markAsTouched();
                }
            });
            return;
        }

        this.loginInProgress = true;
        this.loginError = '';
        const { username, password, rememberMe } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
            next: (response) => {
                this.loginInProgress = false;

                // Handle remember me
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                // Navigate to dashboard
                this.router.navigate(['/job']);
            },
            error: (error) => {
                this.loginInProgress = false;
                this.loginError = 'Invalid username or password. Please try again.';
                console.error('Login error:', error);
            }
        });
    }
}
