# Travlr Getaways

**Madison Parker**  
**SNHU CS 465 - Full Stack Development**

Travlr Getaways is the full stack project I built throughout CS 465. I started with the customer-facing travel site and kept building on it each module until it included an Express backend, Handlebars views, MongoDB, a REST API, an Angular admin application, CRUD features, and login security with JWTs.

The public side of the project is meant for customers looking through available trips. The Angular side is the admin area where an authorized user can add, edit, and delete trip records.

## Project Structure

- `app_server/` - Express routes, controllers, and Handlebars views for the customer-facing site
- `app_api/` - MongoDB models, API controllers, routes, authentication, and database setup
- `app_admin/` - Angular administrator SPA
- `data/` - seed data used to rebuild the trip records for testing
- `postman/` - Postman collections from Modules Five, Six, and Seven
- `docs/MODULE8_JOURNAL_MADISON_PARKER.md` - my Module Eight reflection

## Running the Project

The project needs Node.js, npm, MongoDB, and Angular CLI.

Create a local `.env` file from `.env.example` and replace the JWT placeholder with your own local value.

```text
DB_HOST=127.0.0.1
JWT_SECRET=replace-with-a-long-random-development-secret
```

Start the Express/API side:

```bash
npm install
npm run seed
npm start
```

Then open a second terminal and start the Angular admin site:

```bash
cd app_admin
npm install
npm start
```

Customer site: `http://localhost:3000/travel`  
Admin site: `http://localhost:4200`

## Course Branches

I kept the project organized by module so the progression of the course is still visible.

- `module1` - Express setup and the original customer-facing site
- `module2` - MVC organization and Handlebars
- `module3` - JSON trip data and dynamic rendering
- `module4` - MongoDB and Mongoose
- `module5` - REST API work
- `module6` - Angular SPA and CRUD
- `module7` - login, JWT authentication, and protected endpoints
- `final` - completed project

# Module Eight Journal Reflection

## Architecture

For the frontend I ended up using two different approaches. The customer-facing site uses Express with HTML, CSS, JavaScript, and Handlebars. That side works more like a traditional website because the server renders the page when a route is requested. The administrator side is an Angular single-page application. It uses components, services, forms, and Angular routing, so I could update the page and work with trip data without reloading the whole site every time.

Using both made the difference between the two styles much easier for me to understand. Express was straightforward for the public pages, while Angular made more sense for the admin side because I needed add, edit, delete, and login features all working together.

The backend uses MongoDB because the trip data fits well as documents and already moves through the project as JSON. Mongoose gave me the structure I needed with schemas and models without changing the document-based way the data was stored. It also let both frontends work with the same trip records instead of keeping separate copies of the data.

## Functionality

JavaScript is the programming language that handles the logic in the application. JSON is just a format for storing and passing structured data. In this project JSON was one of the main connections between the frontend and backend. Trip data started in JSON earlier in the course, and later the API returned MongoDB results as JSON for the Express and Angular sides to use.

A lot of the course was refactoring things that worked into something cleaner and easier to keep building on. I changed repeated static trip HTML into Handlebars templates driven by data. The trip data moved from local JSON into MongoDB. In Angular I used reusable trip cards instead of rewriting the same layout, and I kept API calls inside `TripDataService`. I also separated login/token handling into `AuthenticationService` and used the JWT interceptor so I did not have to manually add the token in every component.

The biggest benefit of reusable components and services was that I had fewer places to fix when something went wrong. It also kept the UI more consistent and made the code easier for me to follow by the end of the project.

## Testing

This project made HTTP methods and endpoints feel a lot less abstract. The endpoint is the resource I am trying to reach, while GET, POST, PUT, and DELETE tell the server what I am trying to do with it. I used Postman to test the API directly before depending on the Angular page because it helped me tell whether a problem was coming from the backend or the frontend.

The security testing was the part where that mattered the most. I tested registration and login and confirmed both returned a JWT. I then sent a protected POST request without a token and got a `401 Unauthorized`, which was the result I wanted because it showed the server was actually blocking the request. After logging in, the same protected type of request succeeded with `201 Created`. I also updated the test trip through the Angular admin page and deleted it through the protected API. The final delete returned `200 OK` and the application went back to the original three trips.

That showed me that security cannot just mean hiding buttons in the browser. The backend still has to reject the request when the user is not authenticated.

## Reflection

This course helped me understand how the separate parts of a full stack application actually connect. Earlier in the degree I had worked with frontend code, databases, and backend code as separate ideas. Travlr forced me to follow one feature all the way through the browser, Angular service, API route, controller, model, MongoDB, and then back through the response.

I also got a lot more comfortable troubleshooting. Instead of just changing code until something worked, I started checking the browser, server output, MongoDB data, status codes, and Postman response to narrow down where the problem actually was.

The skills I am leaving the course with include Express MVC structure, Handlebars, MongoDB and Mongoose, REST APIs, Angular components and services, CRUD operations, JSON, Passport, JWT authentication, Postman testing, and Git branches. The project is useful for my portfolio because I can explain how it grew over the course and why each layer is there instead of only showing a finished webpage.
