import requests
from app import app, db, People, Planet, Vehicle

def load_people():
    if People.query.count() > 0:
        print("People ya cargado, saltando...")
        return
    url = "https://swapi.py4e.com/api/people/"
    while url:
        response = requests.get(url).json()
        for item in response["results"]:
            person = People(
                name=item["name"],
                birth_year=item.get("birth_year"),
                gender=item.get("gender"),
                hair_color=item.get("hair_color"),
                eye_color=item.get("eye_color"),
                height=item.get("height"),
                mass=item.get("mass"),
            )
            db.session.add(person)
        db.session.commit()
        url = response.get("next")
def load_planets():
    if Planet.query.count() > 0:
        print("Planets ya cargado, saltando...")
        return
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
    with app.app_context():
        load_people()
        load_planets()
        load_vehicles()