# A mockaroo nem támogatja a beágyazott entitások generálását
import json
trip_reasons_file = open("src/seed/trip_reasons.json")
trip_reasons = json.load(trip_reasons_file)
partners_file = open("src/seed/partners.json")
vehicles_file = open("src/seed/vehicles.json")
partners = json.load(partners_file)
vehicles = json.load(vehicles_file)
generated_destinations = list()
destination = {}
import random
from faker import Faker
fake = Faker()
for i in range(1000):
    destination = {
        "date": fake.date_time_between("-50y", "+1d").strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        "distance": random.randint(0, 20000) * 0.01,
        "vehicle": random.choice(vehicles),
        "from_partner": random.choice(partners),
        "to_partner": random.choice(partners),
        "trip_type": random.choice(trip_reasons),
    }
    generated_destinations.append(destination)

destinations_file = open("src/seed/destinations.json", "w+")
json.dump(generated_destinations, destinations_file, indent=4)
destinations_file.close()
vehicles_file.close()
partners_file.close()
trip_reasons_file.close()
