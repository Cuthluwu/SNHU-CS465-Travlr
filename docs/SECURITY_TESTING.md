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

The Angular application hides Add, Edit, and Delete controls when a user is logged out, but interface controls alone are not a security boundary. The backend route middleware independently checks for a valid Bearer token before POST, PUT, or DELETE operations are allowed.

The rejected unauthenticated POST demonstrated that direct access to the API still fails even if someone bypasses the Angular interface. After login, the authenticated request succeeded using the JWT returned by the API.

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

The trip GET routes remain public so both the customer-facing Express site and the Angular application can retrieve the available packages without requiring administrator authentication.

## Postman Collection

The final request sequence is available in:

`postman/Travlr_Module7_Security.postman_collection.json`

The collection contains registration, login, public GET, unauthorized POST, authenticated POST, authenticated PUT, and authenticated DELETE requests.
