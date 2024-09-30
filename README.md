# RENTNEST
RentNest is a web application built with Express.js and MongoDB that allows users to manage property listings. This project is designed to create, read, update, and delete (CRUD) property listings with full support for validation and error handling.

Features
Create, Read, Update, Delete (CRUD) Operations: Users can create, view, edit, and delete property listings.
Error Handling: Includes custom error handling for better user experience.
Form Validation: Validates user input using Joi schema.
EJS Templating: Uses EJS as a templating engine for rendering views.
MongoDB: Stores property listing data in MongoDB.
Technologies Used
Node.js
Express.js
MongoDB / Mongoose
EJS (Embedded JavaScript)
Method Override: For supporting PUT and DELETE requests from forms.
Joi: For schema validation.
Bootstrap: For styling the frontend.

Prerequisites
Make sure you have the following installed:

Node.js: Download and install from nodejs.org
MongoDB: Download and install from mongodb.com

Routes
Home
GET /
Throws a 404 error by design for demonstration purposes.
Listings
GET /listings
Displays all the listings.

GET /listings/new
Form to create a new listing.

POST /listings
Creates a new listing and redirects to /listings.

GET /listings/:id
Shows details of a specific listing by ID.

GET /listings/:id/edit
Form to edit an existing listing.

PUT /listings/:id
Updates a listing by ID.

DELETE /listings/:id
Deletes a listing by ID.

Error Handling
The app includes custom error handling using a utility class ExpressError. All errors are caught and passed through middleware to render an error page using the error.ejs template.
