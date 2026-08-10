import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  public submitted = false;
  public saving = false;
  public errorMessage = '';
  private tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    const storedTripCode = localStorage.getItem('tripCode');
    if (!storedTripCode) {
      window.alert('No trip was selected for editing.');
      this.router.navigate(['']);
      return;
    }

    this.tripCode = storedTripCode;
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [this.tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (value: Trip[]) => {
        if (!value || value.length === 0) {
          this.errorMessage = 'No trip was retrieved.';
          return;
        }

        const trip = value[0];
        const dateForInput = trip.start
          ? new Date(trip.start).toISOString().slice(0, 10)
          : '';

        this.editForm.patchValue({
          ...trip,
          start: dateForInput
        });
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Unable to retrieve the trip.';
        console.error('Retrieve trip error:', error);
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.editForm.invalid) {
      return;
    }

    this.saving = true;
    const updatedTrip = this.editForm.value as Trip;
    updatedTrip.code = this.tripCode;

    this.tripDataService.updateTrip(this.tripCode, updatedTrip).subscribe({
      next: () => {
        this.saving = false;
        localStorage.removeItem('tripCode');
        this.router.navigate(['']);
      },
      error: (error: any) => {
        this.saving = false;
        this.errorMessage = error?.error?.message || 'Unable to update the trip.';
        console.error('Update trip error:', error);
      }
    });
  }

  public cancel(): void {
    localStorage.removeItem('tripCode');
    this.router.navigate(['']);
  }

  get f() {
    return this.editForm.controls;
  }
}
