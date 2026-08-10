import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public formError = '';
  public submitting = false;

  public credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required.';
      return;
    }

    const user = {
      email: this.credentials.email.trim(),
      name: ''
    } as User;

    this.submitting = true;
    this.tripDataService.login(user, this.credentials.password).subscribe({
      next: (response) => {
        this.authenticationService.saveToken(response.token);
        this.submitting = false;
        this.router.navigate(['']);
      },
      error: (error: any) => {
        this.submitting = false;
        this.formError = error?.error?.message || 'Login failed. Check the email and password.';
      }
    });
  }
}
