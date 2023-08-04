# import datetime
# Importing the HWSet class from the hardwareSet module
from back_end import hardwareSet


# Function to create a new hardware document in the database
def create_hardware(id, capacity, hardware):
    # Creating a new hardware document with the provided ID, capacity, and availability set to the initial capacity
    hwDocument = {
        "hwID": id,
        "capacity": capacity,
        "availability": capacity,
        "checkedout": 0
    }
    # Inserting the new hardware document into the 'hardware' collection
    hardware.insert_one(hwDocument)


# Function to query hardware information from the database based on hardware ID
def query_hardware(hwID, hardware):
    # Creating a query based on the hardware ID
    myquery = {"hwID": hwID}
    # Querying the 'hardware' collection and retrieving the matching document
    x = hardware.find_one(myquery)
    # Removing the '_id' field from the document to make it more readable
    x.pop("_id")
    return x


# Function to update hardware information in the database
def update_hardware(hw, hardware):
    # Creating a query based on the hardware ID from the provided HWSet object
    myquery = {"hwID": hw.get_ID()}
    # Creating new values to update in the document with the information from the provided HWSet object
    newvalues = {
        "$set": {
            "capacity": hw.get_capacity(),
            "availability": hw.get_availability(),
            "checkedout": hw.get_checkedout_qty()
        }
    }
    print("new_values", newvalues)
    try:
        # Updating the hardware document with the new values
        print("HW DB pervious vaules: ", hardware.find_one(myquery))
        hardware.update_one(myquery, newvalues)
        print("HW DB current vaules: ", hardware.find_one(myquery))
        return 1  # Return 1 to indicate a successful update
    except:
        return 0  # Return 0 to indicate a failed update


# Function to initialize a HWSet object with hardware information from the database based on the provided ID
def ini_hardware(id, hardware):
    # Querying the hardware information from the database based on the provided ID
    x = query_hardware(id, hardware)
    # Creating a new HWSet object with the retrieved information
    return hardwareSet.HWSet(id, x['capacity'], x['availability'])


# Function to synchronize the HWSet object with the latest hardware information from the database
def sync_hardware(id, hardware, hw):
    # Querying the hardware information from the database based on the provided ID
    x = query_hardware(id, hardware)
    # Updating the HWSet object with the latest information from the database
    hw.set_new_values(x['capacity'], x['availability'], x['checkedout'])

    # Returning a dictionary with the 'restatus' key set to 1 to indicate success
    return {"restatus": 1}
