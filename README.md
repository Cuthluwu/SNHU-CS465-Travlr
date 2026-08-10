<div align="center">

# Travlr Getaways · Module 7
### Authentication, JWT Security & Protected CRUD

**Madison Parker · SNHU CS 465**

![Module](https://img.shields.io/badge/Checkpoint-Module_7-2563eb?style=for-the-badge)
![Security](https://img.shields.io/badge/Focus-JWT_Security-7c3aed?style=for-the-badge)

</div>

## Checkpoint Focus

Module Seven completed the security layer for the administrator application. Registration and login produce JSON Web Tokens, the Angular application maintains authentication state, and the Express API independently verifies a Bearer token before allowing trip records to be created, updated, or deleted.

### Verified security workflow

| Test | Result |
|---|---:|
| Register administrator | **200 OK + JWT** |
| Administrator login | **200 OK + JWT** |
| Protected POST without token | **401 Unauthorized** |
| Protected POST with JWT | **201 Created** |
| Authenticated SPA update | **Successful** |
| Protected DELETE with JWT | **200 OK** |

### Skills represented at this checkpoint

- Administrator login form
- Passport authentication
- Salted password hashing
- JWT generation and validation
- Angular authentication service and interceptor
- Protected server-side POST/PUT/DELETE routes
- Postman authentication/security testing

## Course Progression

`module1` → `module2` → `module3` → `module4` → `module5` → `module6` → **module7** → **final**

For the completed portfolio, documentation, setup instructions, and Module Eight reflection, review [`main`](https://github.com/Cuthluwu/SNHU-CS465-Travlr) or [`final`](https://github.com/Cuthluwu/SNHU-CS465-Travlr/tree/final).

<div align="center">**Madison Parker · CS 465 Full Stack Development**</div>
