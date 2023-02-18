const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { gql } = require("apollo-server-express");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://user:user@cluster0.5xuzjtk.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Create the User and Employee models
const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", employeeSchema);

// Define the GraphQL schema
const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    login(username: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeByID(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    updateEmployeeByID(
      id: ID!
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    deleteEmployeeByID(id: ID!): Employee
  }
`;

// Define the GraphQL resolvers
const resolvers = {
  Query: {
    login: async (parent, args) => {
      const user = await User.findOne({
        username: args.username,
        password: args.password,
      });
      return user;
    },
    getAllEmployees: async () => {
      const employees = await Employee.find({});
      return employees;
    },
    searchEmployeeByID: async (parent, args) => {
      const employee = await Employee.findById(args.id);
      return employee;
    },
  },
  Mutation: {
    signup: async (parent, args) => {
      const user = new User({
        username: args.username,
        email: args.email,
        password: args.password,
      });
      await user.save();
      return user;
    },
    addNewEmployee: async (parent, args) => {
      const employee = new Employee({
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        gender: args.gender,
        salary: args.salary,
      });
      await employee.save();
      return employee;
    },
    updateEmployeeByID: async (parent, args) => {
      const employee = await Employee.findByIdAndUpdate(
        args.id,
        {
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
        },
        { new: true }
      );
      return employee;
    },
    deleteEmployeeByID: async (parent, args) => {
      const employee = await Employee.findByIdAndRemove(args.id);
      return employee;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize the ApolloServer
async function startServer() {
  await server.start();

  server.applyMiddleware({ app });
  app.listen({ port: 3000 }, () => {
    console.log(
      `Server is running at http://localhost:3000${server.graphqlPath}`
    );
  });
}

startServer();

// // Start the Express server
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
