# import datetime

from pymongo import MongoClient
import certifi
from hardwareSet import HWSet

# uri = "mongodb+srv://bo317:1234@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"
# ca = certifi.where()
# # Use Cluster0
# client = MongoClient(uri, tlsCAFile=ca)


# db = client.test
# hardware = server.db.hardwares


def create_hardware(id, capacity, hardware):

    # hwset1 = HWSet(id, capacity)

    hwDocument = {
        "hwID": id,
        "capacity": capacity,
        "availability": capacity,
        "checkedout": 0}
    hardware.insert_one(hwDocument)


def query_hardware(hwID, hardware):
    myquery = {"hwID": hwID}
    x = hardware.find_one(myquery)
    x.pop("_id")
    return x


def update_hardware(hw, hardware):

    # hwID = hw.get_ID()
    # capacity = hw.get_capacity()
    # availability = hw.get_availability()
    # checkedout = hw.get_checkedout()

    myquery = {"hwID": hw.get_ID()}
    newvalues = {"$set": {"capacity": hw.get_capacity(),
                          "availability": hw.get_availability(), "checkedout": hw.get_checkedout_qty()}}
    print("new_values", newvalues)
    try:
        hardware.update_one(myquery, newvalues)
        return 1
    except:
        return 0


def ini_hardware(id, hardware):
    x = query_hardware(id, hardware)
    return HWSet(id, x['capacity'], x['availability'])


def sync_hardware(id, hardware, hw):

    x = query_hardware(id, hardware)
    hw.capacity = x['capacity']
    hw.availability = x['availability']
    hw.availability = x['availability']
    hw.checkedout = x['checkedout']

    return {"restatus": 1}


# if (x['name'] == {'first': 'Abhay', 'last': 'Samant'}):
#     print("Name found\n")
# else:
#     print("Name not found\n")
