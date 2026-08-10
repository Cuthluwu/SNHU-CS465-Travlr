import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() tripDeleted = new EventEmitter<void>();

  public deleting = false;

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    const confirmed = window.confirm(
      `Delete ${trip.name} (${trip.code})? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    this.deleting = true;
    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.deleting = false;
        this.tripDeleted.emit();
      },
      error: (error: unknown) => {
        this.deleting = false;
        console.error('Delete failed:', error);
        window.alert('The trip could not be deleted.');
      }
    });
  }
}
