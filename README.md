# MoodTunes 🎵

MoodTunes is a full-stack MERN application that recommends songs based
on the user's mood. It features secure authentication, role-based admin
access, cloud media storage, and direct audio streaming.

## Features

-   🔐 JWT authentication with HTTP-only cookies
-   👥 Role-Based Access Control (Admin/User)
-   🎵 Mood-based song recommendations
-   ☁️ Cloud storage using ImageKit
-   📤 MP3 and poster upload using Multer
-   🎧 HTML5 audio player with playback controls
-   🗄️ MongoDB for storing song metadata
-   ⚛️ React Context API for global state management

## Tech Stack

### Frontend

-   React
-   React Router
-   Context API
-   Axios

### Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT
-   bcrypt
-   Multer
-   ImageKit

## Project Architecture

``` text
React Frontend
      │
      ▼
Express REST API
      │
 ┌────┴───────────────┐
 │                    │
Auth             Song APIs
 │                    │
 ▼                    ▼
MongoDB         ImageKit Storage
```

## Authentication Flow

1.  User registers with username, email, and password.
2.  Password is hashed using bcrypt before being stored.
3.  User logs in.
4.  Backend verifies credentials.
5.  JWT is generated and stored in an HTTP-only cookie.
6.  Protected routes call `/api/auth/get-me` to validate the current
    session.

## Role-Based Access Control

-   Every user has a `role` field (`user` or `admin`).
-   Only users with the `admin` role can access the admin dashboard.
-   Admin-only routes are protected on both the frontend and backend.
-   Non-admin users are redirected away from admin pages.

## Song Upload Flow

1.  Admin selects:
    -   Song (.mp3)
    -   Poster image
    -   Title
    -   Mood
2.  React sends data using `FormData`.
3.  Multer processes uploaded files.
4.  Files are uploaded to ImageKit.
5.  MongoDB stores:
    -   Title
    -   Mood
    -   Song URL
    -   Poster URL

## Mood Recommendation Flow

1.  User selects a mood.

2.  Frontend requests:

        GET /api/songs?mood=happy

3.  Backend fetches a matching song.

4.  Browser streams audio directly from ImageKit.

## Security

-   Password hashing with bcrypt
-   JWT authentication
-   HTTP-only cookies
-   Protected routes
-   Role-based authorization

## Future Improvements

-   Playlists
-   Favorites
-   Search and filtering
-   Random recommendations
-   Upload progress
-   Analytics dashboard
-   Refresh tokens
-   Redis caching

## Author

**Aditya Mishra** - MERN Stack Developer - Passionate about scalable
full-stack applications and secure backend architecture.
