import json
import random
import string

# Function to generate a random string of words
def random_string(length=10):
    letters = string.ascii_lowercase
    return ' '.join(''.join(random.choice(letters) for i in range(length)) for _ in range(5))

# Function to create a random set with a given ID
def create_random_set(listing_id):
    title = random_string(3).title()
    seller = "Seller " + str(random.randint(1, 10))
    condition = random.choice(["MISB", "Used", "New"])
    minifig_count = str(random.randint(1, 5))
    locations = [random.choice(["Lisbon", "Berlin", "Munich", "Paris", "London"])]
    minifigures_included = [random_string() for _ in range(4)]
    random_text = [random_string() for _ in range(4)]
    description = [random_string() for _ in range(3)]
    date_added = f"{random.randint(2020, 2023)}-{random.randint(1, 12):02}-{random.randint(1, 28):02}"

    return {
        "id": listing_id,
        "title": title,
        "seller": seller,
        "condition": condition,
        "minifigCount": minifig_count,
        "locations": locations,
        "minifiguresIncluded": minifigures_included,
        "randomText": random_text,
        "description": description,
        "dateAdded": date_added
    }

# Generate 20 random sets
sets = [create_random_set(i) for i in range(1, 80)]

# Prepare the final data structure
data = {
    "sets": sets
}

# Write the JSON data to a file
with open('test_db.json', 'w') as file:
    json.dump(data, file, indent=4)

print("JSON file with 80 random sets created successfully.")

