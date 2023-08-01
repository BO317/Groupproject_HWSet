from flask import Flask, request, jsonify
import db_user
import json
from hardwareSet import HWSet
import db_hardware
import db_project
import certifi
from pymongo import MongoClient
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os


# Set up the MongoDB connection
# service_key = constants.API_KEY_Mongo
service_key = '1234'
uri = f"mongodb+srv://bo317:{service_key}@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"
ca = certifi.where()
client = MongoClient(uri, tlsCAFile=ca)
db = client.test
hardware = db.hardwares
user = db.users
project = db.projects


# print(db_project.create_project("33333", "1", project))
# print(db_project.query_project("33333", project))
# result = db_project.query_project("33333", project)


def joinProject(pjt_id, newmember, project_collection):
    result = db_project.query_project(pjt_id, project_collection)
    if result['restatus'] == 1:
        if newmember in result["member"]:
            return {'restatus': 0, 'message': "This user is already a mamber"}
        else:
            myquery = {"pID": pjt_id}
            newvalues = {"$addToSet": {"member": newmember}}
            project_collection.update_one(myquery, newvalues)
            return {'restatus': 1, 'message': "Joined the project."}
    else:
        return {'restatus': 0, 'message': "No project found"}


print(joinProject("33333", "4", project))
