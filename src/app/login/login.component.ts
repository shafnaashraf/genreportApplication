import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {NgClass, NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIf
    ],
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    showPassword = false;
    loginInProgress = false;
    loginError = '';

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initLoginForm();
    }

    initLoginForm(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    isFieldInvalid(field: string): boolean {
        const control = this.loginForm.get(field);
        if (!control) {
            return false;
        }

        return control.invalid && (control.dirty);
    }


    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            // Mark all fields as touched to trigger validation messages
            Object.keys(this.loginForm.controls).forEach(field => {
                const control = this.loginForm.get(field);
                if (control) {
                    control.markAsTouched();
                }
            });
            return;
        }

        this.loginInProgress = true;
        const { username, password, rememberMe } = this.loginForm.value;

        // Simulate API call
        setTimeout(() => {
            // Here you would normally call your authentication service
            // this.authService.login(username, password).subscribe(...)

            // For demo purposes, we'll just simulate a successful login
            this.loginInProgress = false;

            // Store the remember me preference if needed
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }

            // Navigate to the dashboard or home page
            this.router.navigate(['/job']);
        }, 1500);
    }

    goToRegister(event: Event): void {
        event.preventDefault();
        // Navigate to register page
        // this.router.navigate(['/register']);
        console.log('Navigate to register page');
    }
}
