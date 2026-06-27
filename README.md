# 🚀 Apollo GraphQL Practice Project

A hands-on project built to learn and practice GraphQL using Apollo Server and Apollo Client. This repository demonstrates how to create GraphQL APIs, define schemas, write resolvers, and consume GraphQL data efficiently.

---

## 📖 Overview


This project was created as part of my GraphQL learning journey to understand:

- GraphQL fundamentals
- Apollo Server setup
- Apollo Client integration
- Queries and Mutations
- Schema design
- Resolver implementation
- Data fetching and state management

---

## ✨ Features

- ✅ GraphQL API with Apollo Server
- ✅ Custom Schema & Type Definitions
- ✅ Query Operations
- ✅ Mutation Operations
- ✅ Resolver Functions
- ✅ Apollo Client Integration
- ✅ Error Handling
- ✅ Clean Project Structure

---

## 🛠️ Tech Stack

| Technology              | Purpose                  |
| ----------------------- | ------------------------ |
| GraphQL                 | API Query Language       |
| Apollo Server           | Backend GraphQL Server   |
| Apollo Client           | Frontend Data Management |
| Node.js                 | Runtime Environment      |
| Express.js              | Server Framework         |
| JavaScript / TypeScript | Development Language     |

---

## ⚙️ Installation

Clone the repository:

Install dependencies:

```bash
npm install
```

---

## 🚀 Running the Project

Start the development server:

```bash
npm run dev
```

or

```bash
npm start
```

Server will run at:

```bash
http://localhost:4000
```

---

## 🧪 Example Query

```graphql
query GetUsers {
  users {
    id
    name
    email
  }
}
```

### Example Response

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
}
```

---

## 🎯 Learning Outcomes

Through this project, I practiced:

- Understanding GraphQL architecture
- Designing schemas and types
- Creating resolvers
- Executing queries and mutations
- Apollo ecosystem fundamentals
- API testing with GraphQL Playground

---

## 📸 Playground

Apollo Sandbox / GraphQL Playground can be accessed after starting the server:

```bash
http://localhost:4000/
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📚 Resources

- GraphQL Documentation
- Apollo GraphQL Documentation
- Apollo Client Documentation

---

## 👨‍💻 Author

Made with ❤️ while learning Apollo GraphQL.

Feel free to ⭐ the repository if you found it useful!
