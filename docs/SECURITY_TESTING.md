# Module Seven Security Testing

**Madison Parker**  
**SNHU CS 465 — Full Stack Development**

## Purpose

The final security iteration added administrator registration and login, JWT creation, protected write endpoints, and authenticated CRUD controls in the Angular SPA. I tested the API directly in Postman before completing the same workflow through the browser so that backend behavior could be verified independently from the user interface.

## Verification Sequence

| Step | Request / Action | Expected | Verified |
|---|---|---|---|
| 1 | Register mock administrator | Account created and JWT returned | **200 OK** |
| 2 | Log in with the mock administrator | Valid JWT returned | **200 OK** |
| 3 | POST a trip without an Authorization header | Server rejects request | **401 Unauthorized** |
| 4 | POST the same test trip with a valid JWT | Server accepts request | **201 Created** |
| 5 | Log in through the Angular SPA | Administrative controls become available | **Successful** |
| 6 | Edit the Module Seven test trip in Angular | Updated record is returned/displayed | **Successful** |
| 7 | DELETE the test trip with the JWT | Test record removed | **200 OK** |
| 8 | Refresh the SPA | Original seeded trip set remains | **3 trips displayed** |

## Why the 401 Test Matters

The Angular application hides Add, Edit, and Delete controls when a user is logged out, and the Add/Edit components redirect to the login page when opened without an active token. Those interface controls improve the user experience, but they are not the security boundary.

The backend route middleware independently checks for a valid Bearer token before POST, PUT, or DELETE operations are allowed. The rejected unauthenticated POST demonstrated that direct access to the API still fails even if someone bypasses the Angular interface. After login, the same type of request succeeded using the JWT returned by the API.

## Protected Routes

```text
POST   /api/trips
PUT    /api/trips/:tripCode
DELETE /api/trips/:tripCode
```

A valid request uses:

```text
Authorization: Bearer <JWT>
```

The trip GET routes remain public so the customer-facing Express site and Angular application can retrieve available packages without administrator authentication.

## Repository Protection Notes

The public portfolio intentionally excludes local secrets and runtime credentials:

- `.env` is ignored by Git.
- `.env.example` contains placeholders only.
- The Module Seven Postman collection uses a mock `@travlr.test` email address and a mock password intended only for localhost testing.
- The Postman token variable is committed empty and is populated at runtime after successful authentication.
- No JWT captured during testing is stored in the repository.

The project implements the security controls required for the CS 465 course. For a production system I would additionally restrict administrator account provisioning, use HTTPS-only deployment controls, add rate limiting and monitoring, and review browser token storage against the deployment threat model.

## Postman Collections

The repository includes the API testing progression used across the final modules:

- `Travlr_Module5.postman_collection.json` — GET endpoint verification
- `Travlr_Module6.postman_collection.json` — pre-security CRUD workflow
- `Travlr_Module7_Security.postman_collection.json` — registration, login, JWT authorization, rejected unauthenticated writes, and authenticated CRUD

The Module Seven collection is the authoritative collection for testing the final secured application.
