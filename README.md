# 🌌 Star Wars Blog + REST API

A full-stack **Star Wars Blog** application built with **React** and **Flask**, featuring a RESTful API, SQLAlchemy database, database migrations with Flask-Migrate, and a favorites management system.

This project combines the original Star Wars Blog frontend with the REST API exercise required by **4Geeks Academy**, providing a single, fully integrated application.

---

# 🚀 Features

* ⭐ Browse Star Wars characters, planets and vehicles
* ❤️ Add and remove favorites
* 🔄 Shared favorites state using React Context API
* 🌐 RESTful API built with Flask
* 🗄️ SQLite database with SQLAlchemy ORM
* 📦 Database versioning using Flask-Migrate (Alembic)
* 📬 Postman collection included for API testing
* ✅ REST endpoints compliant with the 4Geeks Academy requirements

---

# 🛠 Technologies

### Frontend

* React
* Vite
* React Context API
* Bootstrap

### Backend

* Flask
* Flask SQLAlchemy
* Flask-Migrate
* Flask-CORS
* SQLite

---

# 📁 Project Structure

```text
SW-FS/
│
├── backend/
│   ├── migrations/
│   ├── postman/
│   │   └── starwars_api_collection.json
│   ├── app.py
│   ├── requirements.txt
│   └── database.db
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── ...
│
├── README.md
└── package.json
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone <repository-url>
cd SW-FS
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment.

Windows

```bash
venv\Scripts\activate
```

macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run database migrations

```bash
flask db upgrade
```

Start the backend server

```bash
python app.py
```

The API will run at

```text
http://localhost:3001
```

---

## Frontend Setup

From the project root:

```bash
npm install
npm run dev
```

The React application will run at

```text
http://localhost:5173
```

---

# 🗄 Database Migrations

This project uses **Flask-Migrate** for database version control.

Apply existing migrations

```bash
flask db upgrade
```

Create a new migration

```bash
flask db migrate -m "Migration description"
```

Apply it

```bash
flask db upgrade
```

---

# 🌐 REST API

## Users

| Method | Endpoint |
| ------ | -------- |
| GET    | `/users` |

---

## People

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | `/people`             |
| GET    | `/people/<people_id>` |

---

## Planets

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/planets`             |
| GET    | `/planets/<planet_id>` |

---

## Vehicles

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/vehicles`              |
| GET    | `/vehicles/<vehicle_id>` |

---

## Favorites (4Geeks Required Endpoints)

| Method | Endpoint                       |
| ------ | ------------------------------ |
| GET    | `/users/<user_id>/favorites`   |
| POST   | `/favorite/people/<people_id>` |
| DELETE | `/favorite/people/<people_id>` |
| POST   | `/favorite/planet/<planet_id>` |
| DELETE | `/favorite/planet/<planet_id>` |

---

## Compatibility Endpoints

To preserve compatibility with the existing React frontend, the following generic endpoints are also available:

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | `/favorite`               |
| DELETE | `/favorite/<favorite_id>` |

---

# 📬 Postman Collection

A ready-to-use Postman collection is included in the project.

```text
backend/postman/starwars_api_collection.json
```

Import this file into Postman to test all available API endpoints.

---

# 💾 Database Models

The application includes the following entities:

* User
* People
* Planet
* Vehicle
* Favorite

Favorites are linked to users and can reference characters, planets or vehicles.

---

# 🎯 Academic Requirements

This project satisfies the REST API requirements established by **4Geeks Academy**, including:

* User listing endpoint
* Individual resource endpoints
* Favorite management endpoints
* SQLAlchemy models
* Flask-Migrate integration
* RESTful architecture
* Postman collection for API testing

---

# 👨‍💻 Author

Developed as part of the **Full Stack Software Developer Bootcamp** at **4Geeks Academy**.
