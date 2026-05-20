````md id="j2m8vx"
# Flippr Marketplace

Flippr is a modern AI-powered marketplace platform designed for seamless buying and selling of second-hand products. The application combines intelligent AI-assisted listing features with cloud-based infrastructure to deliver a responsive and scalable marketplace experience.

---

## Overview

Flippr enables users to:
- Create and manage product listings
- Upload product images
- Browse and filter listings
- Generate AI-assisted product descriptions
- Receive AI-based resale price suggestions
- Communicate through in-app messaging
- Access personalized user profiles
- Experience real-time cloud-synced product data

The platform is built with a modern frontend architecture and integrated cloud services for authentication, storage, and database management.

---

## Features

- AI-generated product descriptions using Gemini AI
- AI-powered resale price estimation
- Firebase Firestore cloud database integration
- Firebase Authentication
- Cloudinary image upload support
- Cross-device synchronized listings
- Product filtering and category-based browsing
- Messaging/chat functionality
- Admin dashboard support
- Responsive and modern user interface
- Vercel deployment support

---

## Tech Stack

### Frontend
- React
- Vite

### Backend Services
- Firebase Firestore
- Firebase Authentication

### Image Hosting
- Cloudinary

### AI Integration
- Gemini AI API

### Deployment
- Vercel

---

## Project Structure

```bash
src/
│
├── assets/
├── components/
├── pages/
├── utils/
│
├── App.jsx
├── firebase.js
├── main.jsx
└── index.css
````

---

## Installation

### Clone Repository

```bash
git clone https://github.com/jadhavvedika758-web/flippr-marketplace.git
```

### Navigate to Project Directory

```bash
cd flippr-marketplace
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## Firebase Configuration

1. Create a Firebase project
2. Enable Firestore Database
3. Enable Firebase Authentication
4. Add Firebase configuration values to `.env`

---

## Cloudinary Configuration

1. Create a Cloudinary account
2. Create an unsigned upload preset
3. Add Cloudinary credentials to `.env`

---

## AI Functionality

Flippr integrates Gemini AI to provide:

* Intelligent product description generation
* Smart resale price recommendations

---

## Deployment

The application is deployed using Vercel.

### Production Build

```bash
npm run build
```

---

## Future Enhancements

* Real-time chat functionality
* Wishlist system
* Product recommendation engine
* Payment gateway integration
* Location-based listings
* Advanced search and sorting
* Dark mode support

---

## License

This project is licensed under the MIT License.

---

## Author

Vedika Jadhav
