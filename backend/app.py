from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
CORS(app)

# ============================
# MODELOS
# ============================

class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    birth_year = db.Column(db.String(50), nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    hair_color = db.Column(db.String(50), nullable=True)
    eye_color = db.Column(db.String(50), nullable=True)
    height = db.Column(db.String(20), nullable=True)
    mass = db.Column(db.String(20), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birth_year": self.birth_year,
            "gender": self.gender,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            "height": self.height,
            "mass": self.mass,
        }

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    climate = db.Column(db.String(120), nullable=True)
    terrain = db.Column(db.String(120), nullable=True)

    def serialize(self):
        return {"id": self.id, "name": self.name, "climate": self.climate, "terrain": self.terrain}


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    model = db.Column(db.String(120), nullable=True)
    manufacturer = db.Column(db.String(120), nullable=True)

    def serialize(self):
        return {"id": self.id, "name": self.name, "model": self.model, "manufacturer": self.manufacturer}


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def serialize(self):
        return {"id": self.id, "email": self.email}


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_type = db.Column(db.String(50), nullable=False)  # "people", "planet", "vehicle"
    item_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {"id": self.id, "user_id": self.user_id, "item_type": self.item_type, "item_id": self.item_id}


# ============================
# ENDPOINTS - LISTAS
# ============================

@app.route("/people", methods=["GET"])
def get_people():
    people = People.query.all()
    return jsonify([p.serialize() for p in people]), 200


@app.route("/planets", methods=["GET"])
def get_planets():
    planets = Planet.query.all()
    return jsonify([p.serialize() for p in planets]), 200


@app.route("/vehicles", methods=["GET"])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([v.serialize() for v in vehicles]), 200


# ============================
# ENDPOINTS - DETALLE (nuevo)
# ============================

@app.route("/people/<int:people_id>", methods=["GET"])
def get_person(people_id):
    person = People.query.get(people_id)
    if person is None:
        return jsonify({"error": "Person not found"}), 404
    return jsonify(person.serialize()), 200


@app.route("/planets/<int:planet_id>", methods=["GET"])
def get_planet(planet_id):
    planet = Planet.query.get(planet_id)
    if planet is None:
        return jsonify({"error": "Planet not found"}), 404
    return jsonify(planet.serialize()), 200


@app.route("/vehicles/<int:vehicle_id>", methods=["GET"])
def get_vehicle(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)
    if vehicle is None:
        return jsonify({"error": "Vehicle not found"}), 404
    return jsonify(vehicle.serialize()), 200


# ============================
# ENDPOINTS - FAVORITOS
# ============================

@app.route("/users/<int:user_id>/favorites", methods=["GET"])
def get_user_favorites(user_id):
    favs = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([f.serialize() for f in favs]), 200


@app.route("/favorite", methods=["POST"])
def add_favorite():
    data = request.get_json()

    if not data or "user_id" not in data or "item_type" not in data or "item_id" not in data:
        return jsonify({"error": "Missing fields"}), 400

    new_fav = Favorite(
        user_id=data["user_id"],
        item_type=data["item_type"],
        item_id=data["item_id"]
    )
    db.session.add(new_fav)
    db.session.commit()
    return jsonify(new_fav.serialize()), 201


@app.route("/favorite/<int:fav_id>", methods=["DELETE"])
def delete_favorite(fav_id):
    fav = Favorite.query.get(fav_id)
    if fav is None:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(fav)
    db.session.commit()
    return jsonify({"msg": "Favorite deleted"}), 200


# ============================
# RUN SERVER
# ============================

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        # crea el usuario de prueba id=1 si no existe (el frontend lo usa fijo)
        if not User.query.get(1):
            test_user = User(email="test@starwars.com", password="1234")
            db.session.add(test_user)
            db.session.commit()

    app.run(debug=True, port=3001)