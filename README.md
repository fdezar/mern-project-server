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

| Method | Endpoint                                 | Description                                            |
| ------ | ---------------------------------------- | ------------------------------------------------------ |
| GET    | /                                         | Test endpoint                                          |
| POST   | /auth/signup                             | Creates a new user in the database                     |
| POST   | /auth/login                              | Verifies email and password and returns a JWT          |
| GET    | /auth/verify                             | Used to verify JWT stored on the client                |
| GET    | /auth/my-profile                         | Retrieves the profile of the authenticated user        |
| PUT    | /auth/my-profile                         | Updates the profile of the authenticated user          |
| DELETE | /auth/my-profile                         | Deletes the profile of the authenticated user          |
| POST   | /auth/upload-image                       | Uploads an image for the authenticated user            |
| PUT    | /auth/:userId/update-image               | Updates the image of the specified user                |
| PUT    | /auth/:userId/delete-image               | Deletes the image of the specified user                |
| POST   | /kanban/:kanbanId/createItem             | Creates a new item in a Kanban board                  |
| PUT    | /kanban/:kanbanId/:kanbanItemId          | Updates an item in a Kanban board                     |
| DELETE | /kanban/:kanbanId/:kanbanItemId          | Deletes an item from a Kanban board                   |
| GET    | /kanban                                   | Retrieves all Kanban boards for the authenticated user|
| POST   | /kanban/create                           | Creates a new Kanban board for the authenticated user |
| GET    | /kanban/:kanbanId                        | Retrieves a specific Kanban board                     |
| PUT    | /kanban/:kanbanId                        | Updates a specific Kanban board                       |
| DELETE | /kanban/:kanbanId                        | Deletes a specific Kanban board                       |
| GET    | /note                                     | Retrieves all notes for the authenticated user        |
| POST   | /note/create                              | Creates a new note for the authenticated user          |
| GET    | /note/:noteId                             | Retrieves a specific note                              |
| PUT    | /note/:noteId                             | Updates a specific note                                |
| DELETE | /note/:noteId                             | Deletes a specific note                                |

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