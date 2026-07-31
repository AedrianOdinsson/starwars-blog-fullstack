import requests
from app import db, People, Planet, Vehicle

def load_people():
    url = url = "https://swapi.py4e.com/api/people/"
    while url:
        response = requests.get(url).json()
        for item in response["results"]:
            person = People(
                name=item["name"],
                description=item.get("birth_year")
            )
            db.session.add(person)
        db.session.commit()
        url = response.get("next")

def load_planets():
    url = "https://swapi.py4e.com/api/planets/"
    while url:
        response = requests.get(url).json()
        for item in response["results"]:
            planet = Planet(
                name=item["name"],
                climate=item.get("climate"),
                terrain=item.get("terrain")
            )
            db.session.add(planet)
        db.session.commit()
        url = response.get("next")

def load_vehicles():
    url = "https://swapi.py4e.com/api/vehicles/"
    while url:
        response = requests.get(url).json()
        for item in response["results"]:
            vehicle = Vehicle(
                name=item["name"],
                model=item.get("model"),
                manufacturer=item.get("manufacturer")
            )
            db.session.add(vehicle)
        db.session.commit()
        url = response.get("next")

if __name__ == "__main__":
    load_people()
    load_planets()
    load_vehicles()

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
    item_type = db.Column(db.String(50), nullable=False)  # "people", "planet", "vehicle"
    item_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_type": self.item_type,
            "item_id": self.item_id
        }
