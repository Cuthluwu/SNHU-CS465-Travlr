# Travlr Getaways - Module 7

**Madison Parker**  
**SNHU CS 465 - Full Stack Development**

Module Seven was the final security step for the admin application. I added registration and login, generated JWTs after authentication, and protected the API routes that change trip records.

## What I worked on

- Admin login form
- Passport authentication
- Salted password hashing
- JWT creation and validation
- Angular authentication service
- JWT interceptor for authenticated requests
- Protected POST, PUT, and DELETE routes
- Postman security testing

For testing, registration and login both returned `200 OK` with a token. A POST without a token returned `401 Unauthorized`, and the authenticated POST returned `201 Created`. I also tested the update through the Angular page and removed the test trip through the protected DELETE request.

The completed project and Module Eight reflection are on `main` and `final`.
