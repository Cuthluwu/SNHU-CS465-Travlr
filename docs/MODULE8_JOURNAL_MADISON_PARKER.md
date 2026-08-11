# CS 465 Module Eight Journal Reflection

**Madison Parker**  
**CS 465 - Full Stack Development**

## Architecture

I used two different frontend approaches in Travlr Getaways. The customer-facing site uses Express with HTML, CSS, JavaScript, and Handlebars. It works like a more traditional website where the server renders the page when a route is requested. The administrator side is an Angular single-page application. That side uses components, services, forms, and Angular routing, which made more sense for the add, edit, delete, and login features because the whole page did not need to reload every time I changed something.

MongoDB worked well for the backend because each trip fits naturally into a document and the data could move through the project as JSON. Mongoose gave me schemas and models so the database still had structure. It also meant the customer site and admin site could both use the same trip records instead of keeping separate data.

## Functionality

JavaScript is the programming language used for the actual logic in the application, while JSON is a format for storing and passing structured data. JSON tied a lot of the project together. Earlier in the course the trip information was stored in JSON, and later the API returned the MongoDB trip records as JSON for the frontend to use.

I refactored the project several times as new pieces were added. Repeated static trip HTML became Handlebars templates driven by data. The trip data moved from local JSON into MongoDB. In Angular I used a reusable trip card component and kept the API calls inside `TripDataService`. When security was added, I separated login and token handling into `AuthenticationService` and used the JWT interceptor so the authorization header did not have to be added manually in every component.

Reusable components and services made the project easier to work on because I had fewer places to repeat the same code. It also made troubleshooting easier because each part had a clearer job.

## Testing

The course made HTTP methods and endpoints much easier for me to understand because I had to use them instead of just read about them. The endpoint is the resource being requested, while GET, POST, PUT, and DELETE describe what I want the server to do with that resource.

I used Postman to test the API separately from Angular. That was especially helpful once security was added. Registration returned `200 OK` with a JWT, login returned `200 OK` with a JWT, and a protected POST without a token returned `401 Unauthorized`. After authentication, the protected POST succeeded with `201 Created`. I also updated the test trip through the Angular admin page and then deleted it through the protected API, which returned `200 OK`.

The `401` test was important to me because it showed that the security was not just the buttons disappearing from the page. The server itself rejected the write request when there was no valid token.

## Reflection

CS 465 helped me connect the frontend, backend, database, API, and security pieces into one project. Before this class, I understood a lot of those pieces separately. Travlr made me follow a feature all the way through the browser, Angular service, API route, controller, model, MongoDB, and response.

I also got better at debugging because I stopped assuming the first error I saw was the actual problem. I became more comfortable checking the browser, server output, MongoDB data, HTTP status codes, and Postman responses to narrow down where something was failing.

The skills I strengthened in this course include Express MVC structure, Handlebars, MongoDB and Mongoose, REST APIs, Angular components and services, CRUD operations, JSON, Passport, JWT authentication, Postman testing, and Git branch management. Travlr is a project I can actually talk through in a portfolio because I understand how it changed over the course and why each layer was added.
