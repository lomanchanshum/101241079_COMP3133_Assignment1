#Node.js, Express, GraphQL, and MongoDB Project
This project is a Node.js application that implements a GraphQL API for a User and Employee database, using the Express and ApolloServer libraries. The data is stored in a MongoDB database, which is connected to the application using the Mongoose ODM library.

#Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#Prerequisites
Before you begin, make sure you have the following installed on your system:

Node.js
npm
MongoDB
#Installing
Clone the repository
bash
Copy code
git clone https://github.com/lomanchanshum/101241079_COMP3133_Assignment1.git
#Navigate to the project directory
bash
Copy code
cd node-express-graphql-mongo
Install the dependencies
Copy code
npm install
Start the MongoDB server
Copy code
mongod
Start the Node.js application
sql
Copy code
npm start
The application should now be running at http://localhost:3000/graphql

#GraphQL API
The GraphQL API has the following queries and mutations:

#Queries:

login: Returns a user matching the given username and password.
getAllEmployees: Returns all the employees stored in the database.
searchEmployeeByID: Returns an employee whose id matches the given id.
Mutations:

signup: Adds a new user to the database with the given username, email, and password.
addNewEmployee: Adds a new employee to the database with the given first name, last name, email, gender, and salary.
updateEmployeeByID: Updates an employee whose id matches the given id with the new values provided for the first name, last name, email, gender, and salary.
deleteEmployeeByID: Deletes an employee whose id matches the given id.
Built With
Node.js
Express
GraphQL
MongoDB
Mongoose
