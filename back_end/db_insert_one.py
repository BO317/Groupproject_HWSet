# Just for test
from pymongo import MongoClient
import certifi
import constants
service_key = constants.API_KEY_Mongo


uri = f"mongodb+srv://bo317:{service_key}@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"
ca = certifi.where()
# Use Cluster0
client = MongoClient(uri, tlsCAFile=ca)


db = client.test


user = db.users
userDocument = {
    "name": {"first": "Ming", "last": "Test"},
    "username": "ming123",
    "password": "123467"
    # "birth": datetime.datetime(1912, 6, 23),
    # "death": datetime.datetime(2030, 10, 15),
    # "contribs": ["Engineer", "Teacher", "Friend"],
    # "views": 250
}

user.insert_one(userDocument)
