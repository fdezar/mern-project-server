# MERN-Project-server

Provisional README.

Tabla con las rutas del back y los modelos

# Productivity App - Server Side

This repository contains the server-side code for the Productivity App, a full-stack productivity application built using the MERN stack. The server handles user authentication, manages tasks and notes data, and interacts with the MongoDB database.

## Features

- RESTful API endpoints for user authentication, tasks, and notes management
- JWT-based authentication for securing routes
- MongoDB database for storing user data
- Integration with Cloudinary for managing images

## Technologies Used

- Node.js: JavaScript runtime for building server-side applications
- Express: Web application framework for Node.js
- MongoDB: NoSQL database for storing data
- Mongoose: MongoDB object modeling tool for Node.js
- Bcrypt: Library for hashing passwords for secure authentication

## Routes

Below are the routes available in the server-side application:

| Route                         | Method | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `/api`                        | GET    | Returns a message indicating successful connection            |
| `/api/auth/signup`            | POST   | Creates a new user in the database                            |
| `/api/auth/login`             | POST   | Verifies email and password and returns a JWT                 |
| `/api/auth/verify`            | GET    | Used to verify JWT stored on the client                       |
| `/api/auth/my-profile`        | GET    | Retrieves user profile information                            |
| `/api/auth/my-profile`        | PUT    | Updates user profile information                              |
| `/api/auth/my-profile`        | DELETE | Deletes user profile                                          |
| `/api/auth/upload-image`      | POST   | Uploads user profile image                                    |
| `/api/kanban`                 | GET    | Retrieves all kanban boards for the authenticated user        |
| `/api/kanban/create`          | POST   | Creates a new kanban board for the authenticated user         |
| `/api/kanban/:kanbanId`       | GET    | Retrieves a specific kanban board by ID                       |
| `/api/kanban/:kanbanId`       | PUT    | Updates a specific kanban board by ID                         |
| `/api/kanban/:kanbanId`       | DELETE | Deletes a specific kanban board by ID                         |
| `/api/kanban/:kanbanId/createItem` | POST   | Creates a new kanban item within a kanban board               |
| `/api/kanban/:kanbanId/:kanbanItemId` | PUT    | Updates a specific kanban item within a kanban board by ID    |
| `/api/kanban/:kanbanId/:kanbanItemId` | DELETE | Deletes a specific kanban item within a kanban board by ID    |
| `/api/notes`                  | GET    | Retrieves all notes for the authenticated user                |
| `/api/notes/create`           | POST   | Creates a new note for the authenticated user                 |
| `/api/notes/:noteId`          | GET    | Retrieves a specific note by ID                               |
| `/api/notes/:noteId`          | PUT    | Updates a specific note by ID                                 |
| `/api/notes/:noteId`          | DELETE | Deletes a specific note by ID                                 |

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables.
5. Start the server using `npm start`.

## License

This project is licensed under the MIT License.

## URL Deploy

Coming soon!

## Slides Link

Coming soon!