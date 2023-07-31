# Function to query user information from the database based on the provided query document
def db_query_user(query_doc, user):
    restatus = {'restatus': 0}  # Default status set to 0 (user not found)

    # Querying the user information from the 'user' collection
    data = user.find_one(query_doc)
    try:
        # Removing the '_id' field from the document to make it more readable
        data.pop('_id')
        # Setting status to 1 to indicate a successful query (user found)
        restatus['restatus'] = 1
    except:
        return restatus  # Return the status (user not found)
    # Merging the status with the retrieved user data
    data = {**restatus, **data}
    return data  # Return the user data with the status


# Function to create a new user document in the database
def create_user(query_doc, user):
    restatus = {'restatus': 0}  # Default status set to 0 (user already exists)
    print("trying to create a new user")
    # Checking if the username already exists
    data = user.find_one({"username": query_doc["username"]})

    try:
        # Removing the '_id' field from the document to make it more readable
        data.pop('_id')
        print("username exists")
        # Return status 0 to indicate that the username already exists
        return {'restatus': 0}

    except:
        # Inserting the new user document into the 'user' collection
        user.insert_one(query_doc)
        print("new user created")
        # Return status 1 to indicate successful creation of the user
        return {'restatus': 1}


# Function to query all user information from the database
def db_query_all(user):
    data = user.find()  # Querying all user documents from the 'user' collection
    return data  # Returning the cursor containing all user documents
