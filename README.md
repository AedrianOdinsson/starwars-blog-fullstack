🌌 StarWars Blog Fullstack
API Flask + Frontend React (Proyecto 4Geeks)
Este repositorio contiene dos proyectos en uno, combinados en una arquitectura full‑stack:

Backend (Flask + SQLAlchemy)  
Implementación de la API StarWars Blog API solicitada por 4Geeks Academy.

Frontend (React + Context + Router)  
Implementación del proyecto StarWars Blog Reading List, consumiendo la API propia en lugar de SWAPI.tech.

El objetivo es crear una aplicación completa que permita:

Listar personajes, planetas y vehículos.

Ver detalles individuales.

Añadir y eliminar favoritos.

Consumir datos desde una API propia.

Mostrar imágenes del Star Wars Visual Guide.

📁 Estructura del proyecto

starwars-blog-fullstack/
│
├── backend/
│   ├── app.py
│   ├── load_swapi.py
│   ├── models.py
│   ├── instance/
│   └── venv/
│
└── frontend/
    └── starwars-frontend/
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.jsx
        │   │   └── Card.jsx
        │   ├── pages/
        │   │   ├── Home.jsx
        │   │   ├── People.jsx
        │   │   ├── Planets.jsx
        │   │   ├── Vehicles.jsx
        │   │   └── Details.jsx
        │   ├── context/
        │   │   └── FavoritesContext.jsx
        │   ├── App.jsx
        │   └── main.jsx
        ├── public/
        ├── package.json
        └── vite.config.js

🧠 Tecnologías utilizadas
Backend
Python 3

Flask

SQLAlchemy

Marshmallow

SQLite

Fetch a SWAPI.tech para cargar datos

Estructura RESTful

Frontend
React

React Router

Context API

Vite

Fetch API

Star Wars Visual Guide (imágenes)
