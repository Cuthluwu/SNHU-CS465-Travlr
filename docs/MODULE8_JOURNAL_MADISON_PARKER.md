# CS 465 Module Eight Journal Reflection

**Madison Parker**  
**CS 465 — Full Stack Development**

## Architecture

The Travlr Getaways project used several frontend approaches as it developed. I began with the supplied customer-facing HTML, CSS, and JavaScript running through Express. That gave me a stable public site before I changed the architecture. I then moved the customer pages into an Express MVC structure with routes, controllers, Handlebars views, and reusable partials. The administrator side was built as an Angular single-page application, which gave the project more interactive behavior because the trip listing, add form, edit form, and login screen could work through Angular routing and reusable components rather than relying on a new server-rendered page for every action.

The backend used MongoDB because the trip records fit naturally into a document model and the data could move cleanly between MongoDB, Express, and Angular as JSON. Mongoose provided the structure I still needed by defining the Trip schema and required fields. Using one database also meant the public site and administrator SPA were working with the same trip records instead of separate copies of the data.

## Functionality

JavaScript is the programming language that implements the behavior of the application, while JSON is a data format used to represent and exchange structured values. JSON connected the frontend and backend throughout this project. The first trip data source was a JSON file, and later the Express API returned MongoDB results as JSON to both the public application and Angular SPA.

I refactored the project several times instead of leaving each new feature attached to the original structure. Static trip HTML became a Handlebars loop driven by trip data. Local JSON storage became MongoDB behind a REST API. In Angular, trip rendering was separated into a reusable trip card component, and API calls were centralized in `TripDataService`. During the security module, token handling was separated into `AuthenticationService`, while the JWT interceptor handled adding the Bearer token to authenticated requests. Reusable components and services reduced duplicated code, kept behavior consistent, and made it easier to isolate problems when testing.

## Testing

The project helped me understand methods and endpoints as related but separate parts of an API request. The URL identifies the resource, while GET, POST, PUT, and DELETE describe what the client is asking the server to do. I tested the trip endpoints directly in Postman before relying on the Angular UI because that made it easier to determine whether an issue was in the API or the frontend.

Security made testing more specific. A request can contain valid trip data and still need to fail if the user is not authorized. In my final Module Seven test, registration returned HTTP 200 with a JWT, login returned HTTP 200 with a JWT, and a protected POST without a token returned HTTP 401. After authentication, the protected POST returned HTTP 201, the SPA successfully updated the test trip, and the protected DELETE returned HTTP 200. That process showed me why hiding buttons in the frontend is not enough: the server must also protect the write endpoint itself.

## Reflection

This course helped me connect frontend development, backend routing, databases, APIs, and security into one complete workflow. The most useful part was learning to follow a problem through every layer instead of assuming the error was in the first place I noticed it. I became more comfortable checking server logs, HTTP status codes, MongoDB data, browser behavior, and Postman responses as part of the same debugging process.

The skills I developed include Express MVC organization, Handlebars templating, MongoDB and Mongoose, REST API design, Angular components and services, CRUD operations, JSON data flow, Passport authentication, JWT security, Postman testing, and Git branch management. The completed Travlr application is useful in my portfolio because I can explain not only what the code does, but also why the application is separated into layers, how those layers communicate, and how I verified that the administrative security controls work.
