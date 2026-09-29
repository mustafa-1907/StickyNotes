# Sticky Notes App

A backend application for creating and managing personal sticky notes.
Users can create notes, view their notes, update or replace them, search through
their notes, and manage their account.

The project also includes an authentication flow and user ownership,
ensuring that users can only manage their own notes.

## Tech Stack
- Express.js
- JavaScript
- MongoDB
- Mongoose

### Extra Technologies
- Nodemailer — email verification / OTP
- JWT — authentication
- bcrypt — password hashing
- Zod  — request validation

## Features

### Authentication
- Register
- Login

### User Management
- Update logged-in user information
- Delete logged-in user
- Get logged-in user data

### Notes Management
- Create a note
- Update a note
- Replace a note
- Update all notes' titles
- Delete a note
- Get a note by ID
- Search notes by content
- Paginate and sort notes
- Retrieve notes with user information
- Aggregate notes with user information and title search
- Delete all notes

### Additional  Features

- Email verification using OTP
- Send OTP
