const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {

  const { email, password, username, firstName, lastName, aboutMe, userImage } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password and username" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, username, firstName, lastName, aboutMe, userImage });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, username, _id, firstName, lastName, aboutMe, userImage } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, username, _id, firstName, lastName, aboutMe, userImage };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

router.get("/my-profile", isAuthenticated, (req, res, next) => {
  // const { userId } = req.params;

  // ToDo - mirar que si estás en un perfil ajeno, puedas acceder al tuyo. Keep the profile page to the currentUser

  const { _id } = req.payload;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(_id)
    .then((userFound) => {
      return res.json(userFound);
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Error retrieving user" });
    });
});

router.put(
  "/my-profile",
  isAuthenticated,
  (req, res, next) => {
    // const { userId } = req.params;
    const { _id } = req.payload;
    const { username, firstName, lastName, email, password, aboutMe } =
      req.body;
    // ToDo - mirar el tema de la imagen
    // ToDo - hacer el password en otro lugar

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    User.findByIdAndUpdate(
      _id,
      { username, firstName, lastName, email, password, aboutMe },
      { new: true }
    )
      .then((userUpdated) => {
        return res.json(userUpdated);
      })
      .catch((err) => {
        console.error("Error while updating user:", err);
      });
  }
);

router.delete("/my-profile", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndDelete(_id)
    .then(() => {
      return res.json({
        message: `User with ${userId} has been removed succesfully`,
      });
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Error deleting user" });
    });
});

router.post(
  "/upload-image",
  fileUploader.single("userImage"),
  (req, res, next) => {

    if (!req.hasOwnProperty('file')) {
      return res.json({ fileUrl: "" });
    }

    return res.json({ fileUrl: req.file.path });
  }
);

router.put("/my-profile/update-image", isAuthenticated, fileUploader.single("userImage"), (req, res, next) => {
  const { _id } = req.payload;

  User.findByIdAndUpdate(_id, { $set: { userImage: req.file.path }}, { new: true }) // ToDo - mirar esto
    .then(() => {
      return res.json({ message: `${userId} image updated successfully` }); 
    })
    .catch((err) => {
      console.error("Error updating user image:", err);
      res.status(500).json({ message: "Error updating user image" });
    });
})

router.put("/my-profile/delete-image", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;

  User.findByIdAndUpdate({ _id: userId }, { userImage: "/images/default-user-image.png" }, { new: true }) // ToDo - cambiar ruta si es necesario de la imagen
    .then(() => {
      return res.json({ message: `${userId} image deleted successfully` }); 
    })
    .catch((err) => {
      next(err);
      console.error("Error deleting user image:", err);
      res.status(500).json({ message: "Error deleting user image" });
    });
});

module.exports = router;
