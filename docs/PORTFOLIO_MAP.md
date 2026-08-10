# CS 465 Portfolio Map

**Madison Parker · Travlr Getaways**

This page is a quick guide for reviewing the completed CS 465 portfolio.

## Final Application

The authoritative completed source is on `main` and mirrored to `final`.

### Customer-facing application

- `app_server/routes/` — Express customer routes
- `app_server/controllers/` — server-side page controllers
- `app_server/views/` — Handlebars templates and reusable partials
- `public/` — customer-facing static assets and original page resources

### API and database

- `app_api/models/db.js` — MongoDB connection
- `app_api/models/travlr.js` — Trip schema/model
- `app_api/models/user.js` — administrator user model and password hashing
- `app_api/models/seed.js` — repeatable seed process
- `app_api/controllers/trips.js` — trip CRUD controller
- `app_api/controllers/authentication.js` — registration/login controller
- `app_api/routes/index.js` — API endpoints and JWT protection
- `app_api/config/passport.js` — Passport local authentication strategy

### Angular administrator SPA

- `app_admin/src/app/trip-listing/` — trip listing view
- `app_admin/src/app/trip-card/` — reusable trip component
- `app_admin/src/app/add-trip/` — create workflow
- `app_admin/src/app/edit-trip/` — update workflow
- `app_admin/src/app/login/` — administrator login screen
- `app_admin/src/app/navbar/` — authentication-aware navigation
- `app_admin/src/app/services/trip-data.service.ts` — trip API communication
- `app_admin/src/app/services/authentication.service.ts` — authentication/token lifecycle
- `app_admin/src/app/utils/jwt.interceptor.ts` — Bearer token attachment

## Testing Material

- `postman/Travlr_Module5.postman_collection.json` — API testing
- `postman/Travlr_Module6.postman_collection.json` — SPA/API CRUD testing
- `postman/Travlr_Module7_Security.postman_collection.json` — authentication and protected endpoint testing
- `docs/SECURITY_TESTING.md` — final security verification summary

## Reflection

- `docs/MODULE8_JOURNAL_MADISON_PARKER.md` — final Architecture, Functionality, Testing, and Reflection responses

## Branches

| Branch | Portfolio checkpoint |
|---|---|
| `module1` | Express/static website foundation |
| `module2` | MVC and Handlebars |
| `module3` | JSON-driven data |
| `module4` | MongoDB/Mongoose |
| `module5` | REST API |
| `module6` | Angular SPA and CRUD |
| `module7` | Authentication and JWT security |
| `final` | Completed project baseline |
