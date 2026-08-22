# 📚 Flashcard Generator

A responsive web application built with **React.js** that allows users to create, manage, view, and share flashcard groups. Each group can contain multiple terms, definitions, and optional images.

The project is designed to make learning and revision easier by organizing study material into simple and interactive flashcards.

## 🚀 Live Demo

https://flashcard-generator-rb.netlify.app/


## ✨ Features

* Create flashcard groups
* Add a group name and description
* Add multiple terms and definitions
* Add images to flashcards
* Image validation for supported formats
* Optional term images
* Delete terms when required
* Form validation using Yup and Formik
* Display validation error messages
* Store flashcards in browser `localStorage`
* Flashcards remain available after page refresh
* View created flashcard groups
* View individual flashcard details
* Share flashcard content
* Print flashcard content
* Download flashcard content
* Responsive design for different screen sizes
* Loading state while submitting
* Success toast notifications

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS

### Libraries & Tools

* Vite
* Redux Toolkit
* React Redux
* React Router DOM
* Formik
* Yup
* React Icons
* React Toastify

### Storage

* Browser LocalStorage

### Deployment

* Netlify

---

## 📋 Project Structure

```text
src/
│
├── components/
│   └── TermInput.jsx
│
├── pages/
│   ├── CreateFlashcard.jsx
│   ├── MyFlashcard.jsx
│   └── FlashcardDetails.jsx
│
├── redux/
│   ├── flashcardSlice.js
│   └── store.js
│
├── utils/
│   └── localStorage.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📝 How It Works

### 1. Create a Flashcard Group

The user can enter:

* Group name
* Group description
* Group image
* Terms
* Definitions
* Term images

The form validates the entered information before submission.

### 2. Add Multiple Terms

Users can click **"Add More"** to add additional terms and definitions to the flashcard group.

Each term can have its own image.

### 3. Form Validation

Formik and Yup are used to validate the form.

Examples of validation include:

* Required fields
* Minimum and maximum character limits
* Valid image formats
* Image file size restrictions

Supported image formats include:

```text
JPG
JPEG
PNG
WEBP
```

### 4. Store Flashcards

After creating a flashcard group, the data is stored in the browser's `localStorage`.

This allows the flashcards to remain available even after refreshing the page.

### 5. View Flashcards

Created flashcards can be viewed from the **My Flashcards** section.

Users can select a flashcard group to view its individual terms and definitions.

### 6. Share, Print & Download

The flashcard details page provides options to:

* Share the flashcard
* Print the flashcard
* Download the flashcard content

---

## 💾 Local Storage

The application uses browser `localStorage` to persist flashcard data.

Flashcard information is converted into a format that can be stored locally, including uploaded images.

This means the application does not require a backend database for storing flashcards.

---

## 📸 Image Handling

The application supports images for flashcard groups and terms.

Images are validated based on:

* File type
* File size

Images are converted into Data URLs before being stored in `localStorage`.

If an optional term image is not provided, no empty image container is displayed.

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Navigate to the Project

```bash
cd flashcard-generator
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will run on the local development server provided by Vite.

---

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🧪 Testing

The project includes tests for important user interactions and form functionality.

Testing covers areas such as:

* Form rendering
* Group name input
* Description input
* Adding additional terms
* Form submission
* Success notifications
* Loading state

Testing tools include:

* Vitest
* React Testing Library
* User Event

Run tests using:

```bash
npm test
```

---

## 🎯 Learning Objectives

This project helped in understanding and implementing:

* React component development
* React Hooks
* Form handling with Formik
* Form validation with Yup
* Dynamic forms using FieldArray
* Redux Toolkit state management
* React Router navigation
* LocalStorage data persistence
* File and image handling
* Responsive UI development
* Component reusability
* Automated testing
* Deployment using Netlify


## ⭐ Conclusion

Flashcard Generator is a React-based learning application that provides a simple way to create and organize study material using interactive flashcards.

The project demonstrates practical knowledge of **React, Redux Toolkit, Formik, Yup, LocalStorage, responsive design, file handling, testing, and deployment**.
