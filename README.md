# Silk MERN Full Stack App - Server Side

![silk-logo](src/assets/images/silk-logo-readme.png)

This repository contains the server-side code for Silk, a full-stack productivity application built using the MERN stack. The server handles user authentication, manages tasks and notes data, and interacts with the MongoDB database.

## Features 💡

- RESTful API endpoints for user authentication, tasks, and notes management
- JWT-based authentication for securing routes
- MongoDB database for storing user data
- Integration with Cloudinary for managing images

## Technologies Used 💻

- Node.js: JavaScript runtime for building server-side applications
- Express: Web application framework for Node.js
- MongoDB: NoSQL database for storing data
- Mongoose: MongoDB object modeling tool for Node.js
- Bcrypt: Library for hashing passwords for secure authentication

## Routes 🛣️

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
| `/api/auth/my-profile/update-image`           | PUT    | Updates the user's profile image                          |
| `/api/auth/my-profile/delete-image`           | PUT    | Deletes the user's profile image                          |
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

## Models

### User Model 👤

```javascript
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userImage: {
      type: String,
      default: "/images/default-icon.png"
    },
    aboutMe: String,
    userKanban: {
      type: Schema.Types.ObjectId,
      ref: "Kanban"
    },
    userNotes: [{
      type: Schema.Types.ObjectId,
      ref: "Note"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
```

## Kanban Model 📑

```javascript
const { Schema, model } = require("mongoose");

const kanbanSchema = new Schema(
    {
       title: {
            type: String,
       },
       kanbanItems: [{
            type: Schema.Types.ObjectId,
            ref: "KanbanItem"
       }],
       user: {
            type: Schema.Types.ObjectId,
            ref: "User"
       }
    },
    {
        timestamps: true,
    }
)

const Kanban = model("Kanban", kanbanSchema);

module.exports = Kanban;
```

## KanbanItem Model 📋

```javascript
const { Schema, model } = require("mongoose");

const kanbanItemSchema = new Schema(
    {
       title: {
            type: String,
       },
       description: {
            type: String,
       },
       kanbanParent: {
            type: Schema.Types.ObjectId,
            ref: "Kanban"
       }
    },
    {
        timestamps: true,
    }
)

const KanbanItem = model("KanbanItem", kanbanItemSchema);

module.exports = KanbanItem;
```

## Note Model 📝

```javascript
const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Note = model("Note", noteSchema);

module.exports = Note;
```

## Getting Started 🚀

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables.
5. Start the server using `npm start`.

## License 📝

This project is licensed under the MIT License.

## URL Deploy 🌐

https://silk-project-server.vercel.app/

## Slides Link 📑

https://www.canva.com/design/DAF-0rn8nHM/_NDxjJoiLqEWz3ixfHGRmQ/view?utm_content=DAF-0rn8nHM&utm_campaign=designshare&utm_medium=link&utm_source=editor