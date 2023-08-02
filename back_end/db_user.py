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
    print("trying to create a new user")
    # Checking if the username already exists
    data = user.find_one({"username": query_doc["username"]})

    try:
        # Removing the '_id' field from the document to make it more readable
        data.pop('_id')
        print("username exists")
        # Return status 0 to indicate that the username already exists
        return {'restatus': 0, "message": "username exists"}

    except:
        # Inserting the new user document into the 'user' collection
        encrypted_result = customEncrypt(query_doc["password"])
        if encrypted_result['restatus'] == 1:
            query_doc["password"] = encrypted_result["encryptedText"]
            print(query_doc)
            user.insert_one(query_doc)
            print("new user created")
            # Return status 1 to indicate successful creation of the user
            return {'restatus': 1}
        else:
            return {'restatus': 0, "message": "Password can contain any ASCII printable characters, except for “space” and “!”"}


# Function to query all user information from the database
def db_query_all(user):
    data = user.find()  # Querying all user documents from the 'user' collection
    return data  # Returning the cursor containing all user documents


# Enter password as text, can contain any ASCII printable characters, except for “space” and “!”
"""The algorithm for this technique will follow these steps:
1. Reverse the input text
2. Shift all the ASCII characters in reversed input text by “N” positions.
• In other words, each letter in the reversed text string is replaced by a letter N positions down the ASCII printable characters list cyclically.
• The direction of shift is also taken into consideration here
• For example, if the inputs are N=3 and D=1(shift right), then then 'A' is replaced by 'D', 'B' by 'E', 'C' by 'F', ..., 'X' by '[', ..., 'Z' by ']'
• On the other hand, if the inputs are N=3 and D=-1(shift left), then then 'D' is replaced by 'A', 'E' by 'B', 'F' by 'C', ..., '[' by 'X', ..., ']' by 'Z'"""


def reversed_string(a_string):
    return a_string[::-1]


def customEncrypt(inputText):
    encryptedText = ""
    res = []

    inputText = reversed_string(inputText)
    N = 3
    D = 1
    if (isinstance(N, int) and N >= 0) and (D == -1 or D == 1):
        for num in str(inputText):
            asc = ord(num)
            if asc >= 34 and asc <= 126:
                res.append(asc + N*D)
            else:
                return {"restatus": 0, "message": "ERROR! invalid password "}

    else:
        return {"restatus": 0, "message": "ERROR! Wrong encrypt input"}

    for i in res:
        encryptedText += chr(i)
    return {"encryptedText": encryptedText, "restatus": 1, "message": "Successfully encrypted"}


def customDecrypt(inputText):
    """The difference from the customEncrypt is inputText can be any string"""
    decryptedText = ""
    res = []

    inputText = reversed_string(inputText)
    N = 3
    D = -1
    if (isinstance(N, int) and N >= 0) and (D == -1 or D == 1):
        for num in str(inputText):
            asc = ord(num)
            res.append(asc + N*D)

    else:
        return {"restatus": 0, "message": "ERROR! Wrong decrypt input"}

    for i in res:
        decryptedText += chr(i)
    return {"decryptedText": decryptedText, "restatus": 1, "message": "Successfully decrypted"}
