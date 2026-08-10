import { InjectionToken } from '@angular/core';

// Local storage keeps the JWT available while the admin SPA is open.
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});
