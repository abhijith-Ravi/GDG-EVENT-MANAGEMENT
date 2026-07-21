# GDG NMIT Event Management Frontend

A modern React-based event management system for GDG NMIT built with Vite.

## Features

✅ User Authentication - Secure sign-in and sign-up with role-based access
✅ Event Discovery - Browse and view upcoming and past events
✅ Event Registration - Register for events with student information
✅ Admin Dashboard - Create, update, and delete events (admin only)
✅ Responsive Design - Works seamlessly on all devices
✅ Modern UI - Clean, intuitive interface with smooth animations

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Backend server running on http://localhost:8080

### Installation

1. Install dependencies:
npm install

2. Start the development server:
npm run dev

The app will be available at http://localhost:5173

### Build for Production

npm run build
npm run preview

## Project Structure

src/
├── api/              # API service calls
├── components/       # Reusable components
├── context/          # Global state management
├── pages/            # Page components
└── App.jsx           # Main app with routing

## API Endpoints

Authentication:
- POST /gdg/signup - User registration
- POST /gdg/signin - User login

Events:
- GET /api/upcomingEvents - Get upcoming events
- GET /api/pastEvents - Get past events
- POST /api/events - Create event (admin)
- PUT /api/events - Update event (admin)
- DELETE /api/events - Delete event (admin)

Registrations:
- POST /gdg/EventRegister - Register for event
- GET /gdg/getRegisteredEvents - Get user's registrations

## Technologies

- React 18
- Vite
- React Router
- CSS3

## License

Copyright © 2024 GDG NMIT. All rights reserved.
