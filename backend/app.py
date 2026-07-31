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
    description = db.Column(db.String(250), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }


class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    climate = db.Column(db.String(120), nullable=True)
    terrain = db.Column(db.String(120), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate,
            "terrain": self.terrain
        }


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    model = db.Column(db.String(120), nullable=True)
    manufacturer = db.Column(db.String(120), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer
        }


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_type = db.Column(db.String(50), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_type": self.item_type,
            "item_id": self.item_id
        }


# ============================
# ENDPOINTS
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


@app.route("/users/<int:user_id>/favorites", methods=["GET"])
def get_user_favorites(user_id):
    favs = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([f.serialize() for f in favs]), 200


@app.route("/favorite", methods=["POST"])
def add_favorite():
    data = request.get_json()
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
    app.run(debug=True, port=3001)
