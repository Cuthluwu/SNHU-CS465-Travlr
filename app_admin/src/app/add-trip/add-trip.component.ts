import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  public submitted = false;
  public saving = false;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.addForm.invalid) {
      return;
    }

    this.saving = true;
    this.tripService.addTrip(this.addForm.value as Trip).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['']);
      },
      error: (error: any) => {
        this.saving = false;
        this.errorMessage = error?.error?.message || 'Unable to add the trip.';
        console.error('Add trip error:', error);
      }
    });
  }

  public cancel(): void {
    this.router.navigate(['']);
  }

  get f() {
    return this.addForm.controls;
  }
}
