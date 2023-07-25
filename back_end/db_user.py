import datetime
from pymongo import MongoClient
import certifi
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# uri = "mongodb+srv://bo317:1234@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"
# ca = certifi.where()

# Use this cluster
# client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=ca)


# collection_handle = db.users
# myquery = {"username": "bo123"}
# x = collection_handle.find_one(myquery)
# print(x)


def db_query_user(query_doc, user):
    dbstatus = {'dbstatus': 0}

    data = user.find_one(query_doc)
    try:
        data.pop('_id')
        dbstatus['dbstatus'] = 1
    except:
        return dbstatus
    data = {**dbstatus, **data}
    return data

# def create_project(p_id, project):
#     projectDocument = {
#         "pID": p_id,
#         "hw1_checked": 0,
#         "hw2_checked": 0
#     }
#     myquery = {"pID": p_id}
#     x = project.find_one(myquery)

#     print(x)

#     try:
#         if (x["pID"]) == p_id:
#             return {"restatus": 0}

#     except:
#         project.insert_one(projectDocument)
#         return {"restatus": 1}


def create_user(query_doc, user):
    dbstatus = {'dbstatus': 0}
    print("trying to create new user")
    data = user.find_one({"username": query_doc["username"]})

    try:
        data.pop('_id')
        print("username exist")
        return {'dbstatus': 0}

    except:
        user.insert_one(query_doc)
        print("new user created")
        return {'dbstatus': 1}


def db_query_all(user):

    data = user.find()
    return data


# y = db_query_all()
# for x in y:
#   print(x)
# x = db_query_all()
# for y in x:
#     print(y)


# myquery = {"username": "bo123"}
# x = db_query_user(myquery)
# print(x)
# if (x['username'] == 'bo123'):
#     print("Name found\n")
# else:
#     print("Name not found\n")
