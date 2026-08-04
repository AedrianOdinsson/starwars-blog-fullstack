# 🌌 StarWars Blog Fullstack

Proyecto full-stack para el bootcamp de 4Geeks (grupo `spain-fs-pt-136`), que combina dos ejercicios del syllabus en una sola aplicación:

- **exercise-starwars-blog-api** → Backend con Flask (API REST)
- **starwars-blog-reading-list** → Frontend con React que consume esa API propia

## 📖 Qué hace

- Lista personajes, planetas y vehículos de Star Wars, cargados desde [SWAPI (swapi.py4e.com)](https://swapi.py4e.com/).
- Permite marcar y quitar favoritos por usuario, guardados en la base de datos propia.
- Al entrar en el detalle de cualquier personaje/planeta/vehículo, muestra:
  - Su imagen real y una breve biografía/descripción, obtenidas en vivo desde [Wookieepedia](https://starwars.fandom.com) (la wiki de Star Wars en Fandom).
  - Datos adicionales extraídos de la infobox de la wiki cuando están disponibles (afiliación, maestro/aprendiz, especie, mundo natal...).
  - Todos los campos guardados en la base de datos propia (altura, color de ojos, clima, fabricante, etc. según el tipo de entidad).
- Interfaz con tema oscuro y componentes de Bootstrap.

## 🧠 Tecnologías utilizadas

### Backend

- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- SQLite
- `requests` para cargar datos iniciales desde SWAPI

### Frontend

- React (Vite)
- React Router DOM
- Context API (gestión de favoritos)
- Bootstrap 5
- Fetch API (a la API propia y a la API pública de Wookieepedia/Fandom)

## 📁 Estructura del proyecto

```
SW-FS/
│
├── backend/
│   ├── app.py              # App Flask: modelos, endpoints REST, arranque del servidor
│   ├── load_swapi.py        # Script para poblar la base de datos desde SWAPI
│   ├── database.db          # Base de datos SQLite (se genera al arrancar app.py)
│   └── venv/                 # Entorno virtual de Python
│
└── frontend/
    └── starwars-frontend/
        ├── src/
        │   ├── context/
        │   │   └── FavoritesContext.jsx   # Estado global de favoritos
        │   ├── App.jsx                     # Definición de rutas
        │   ├── Home.jsx                     # Listado de personajes/planetas/vehículos
        │   ├── CharacterCards.jsx           # Tarjeta individual de cada entidad
        │   ├── Detail.jsx                   # Vista de detalle (foto + bio + datos)
        │   ├── Navbar.jsx                    # Barra superior con contador de favoritos
        │   ├── useWikipediaInfo.js           # Hook: imagen + biografía + infobox (detalle)
        │   ├── useWikipediaImagesBatch.js     # Función: imágenes en lote (listado)
        │   └── main.jsx                       # Punto de entrada, Router + Provider
        ├── public/
        ├── package.json
        └── vite.config.js
```

## 🔌 Endpoints del backend

| Método | Endpoint                     | Descripción                       |
| ------ | ---------------------------- | --------------------------------- |
| GET    | `/people`                    | Lista todos los personajes        |
| GET    | `/people/<id>`               | Detalle de un personaje           |
| GET    | `/planets`                   | Lista todos los planetas          |
| GET    | `/planets/<id>`              | Detalle de un planeta             |
| GET    | `/vehicles`                  | Lista todos los vehículos         |
| GET    | `/vehicles/<id>`             | Detalle de un vehículo            |
| GET    | `/users/<user_id>/favorites` | Lista los favoritos de un usuario |
| POST   | `/favorite`                  | Añade un favorito                 |
| DELETE | `/favorite/<fav_id>`         | Elimina un favorito               |

## 🚀 Cómo levantar el proyecto

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1      # Windows PowerShell
pip install flask flask-sqlalchemy flask-cors requests --break-system-packages
python app.py
```

Esto crea la base de datos, las tablas y un usuario de prueba (`id=1`), y deja el servidor corriendo en `http://localhost:3001`.

En otra terminal (con el entorno virtual también activado), carga los datos de SWAPI **una sola vez**:

```bash
python load_swapi.py
```

### Frontend

```bash
cd frontend/starwars-frontend
npm install
npm run dev
```

La app se sirve en `http://localhost:5173`.

## ⚠️ Notas

- Las imágenes y biografías se consultan en vivo a la API pública de Wookieepedia (Fandom); si un personaje/planeta/vehículo no tiene página o imagen en la wiki, se muestra un placeholder ("Sin imagen" / "Sin descripción disponible").
- El campo de "afiliación / maestro / aprendiz / especie" en el detalle se extrae parseando la infobox de la wiki, por lo que puede no estar disponible para todas las entidades (depende de si la plantilla de esa página en concreto incluye esos campos).
