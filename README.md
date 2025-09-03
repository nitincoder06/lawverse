# Lawverse ⚖️

Lawverse is a full-stack, responsive web application designed to make legal services more accessible and transparent. This platform streamlines the process of finding and booking legal professionals through a comprehensive search and filtering system, while also providing valuable resources to users and promoting judicial transparency.

**Live Demo:** [https://lawverse.vercel.app/]

---

## Key Features

* **Dynamic Lawyer Search:** A powerful, multi-condition filtering system to find lawyers by name, legal specialty, location, and practicing court in real-time.
* **User Authentication:** Secure user registration and login system built with Firebase Auth, featuring protected routes for user-specific pages like booking and admin panels.
* **Detailed Profiles & Booking:** Users can view detailed lawyer profiles and proceed to a dedicated booking page, creating a complete user flow.
* **Admin Dashboard:** A protected admin-only page to manage the application's data, allowing for the addition of new lawyers, courts, and e-books directly to the database.
* **Resource Hub:** Content-rich pages for E-books and Live Court Hearings, fetched directly from a Firestore database to provide users with valuable legal information.

---

## Tech Stack

* **Front-End:** React, Vite, React Router, Tailwind CSS
* **Back-End & Database:** Firebase (Firestore & Authentication)
* **Deployment:** Vercel

---

## Getting Started

To run this project on your local machine, follow these steps:

### Prerequisites

You will need to have Node.js and npm installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/nitincoder06/lawverse.git
    ```

2.  **Navigate into the project directory:**
    ```sh
    cd lawverse
    ```

3.  **Install the necessary packages:**
    ```sh
    npm install
    ```

4.  **Set up your Firebase credentials:**
    * Create a `.env` file in the root of the project.
    * Add your Firebase project configuration keys to the `.env` file with the `VITE_` prefix (e.g., `VITE_FIREBASE_API_KEY="your-key"`).

5.  **Run the application:**
    ```sh
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.
