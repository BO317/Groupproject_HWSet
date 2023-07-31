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


# import constants

# service_key = constants.API_KEY_Mongo

service_key = '1234'


uri = f"mongodb+srv://bo317:{service_key}@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"

ca = certifi.where()
# Use Cluster0
client = MongoClient(uri, tlsCAFile=ca)


db = client.test
hardware = db.hardwares
user = db.users
project = db.projects


# app = Flask(__name__)
app = Flask(__name__, static_folder='../front_end/build', static_url_path='/')
app.secret_key = 'your_secret_key'

# Set up the login manager for managing user authentication
login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    pass


# Initialize hardware objects and synchronizing the database
hw1 = db_hardware.ini_hardware('001', hardware)
hw2 = db_hardware.ini_hardware('002', hardware)

# Define the routes and corresponding functions for the application
# Route for serving the index.html file


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


# @app.route('/user')
# def giveUser():
#     myquery = {"username": "bo123", "password": "1234"}
#     data = db_user.db_query_user(myquery)
#     # data = json.dumps(db_query.db_query_user(myquery))
#     return data


@app.route('/hardware')
def giveHardware():
    data = [{}, {}]
    data[0] = db_hardware.query_hardware("001", hardware)
    data[1] = db_hardware.query_hardware("002", hardware)

    # data = json.dumps(db_query.db_query_user(myquery))
    return data


@app.route('/newproject', methods=['POST'])
def newProject():

    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    print(type(myquery), myquery)
    p_ID = str(myquery["projectID"])

    print(type(p_ID), p_ID)

    data = db_project.create_project(p_ID, project)
    print(data)
    return data


@app.route('/queryproject', methods=['POST'])
def queryProject():

    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    print(type(myquery), myquery)
    p_ID = str(myquery["projectID"])

    print(type(p_ID), p_ID)

    data = db_project.query_project(p_ID, project)
    print(data)
    return data


@app.route('/hwcheckout', methods=['POST'])
def checkout():

    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)

    print(type(myquery), myquery)
    p_ID = str(myquery["projectIDCheckout"])
    x1 = int(myquery["hw1Checkout"])
    x2 = int(myquery["hw2Checkout"])

    p = db_project.query_project(p_ID, project)
    print(p, p_ID, x1, x2)
    if p['restatus'] == 0:
        data = {"restatus": 0}
        return data
    else:

        data = db_project.project_check(hw1, hw2, p, x1, x2, hardware, project)
        print(data)
        return data


@app.route('/hwcheckin', methods=['POST'])
def hw_checkin():

    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)

    print(type(myquery), myquery)
    p_ID = str(myquery["projectIDCheckIn"])
    x1 = int(myquery["hw1Checkin"])
    x2 = int(myquery["hw2Checkin"])

    p = db_project.query_project(p_ID, project)
    print(p, p_ID, x1, x2)

    if p['restatus'] == 1:
        if x1 > p["hw1_checked"] or x2 > p["hw1_checked"]:
            data = {"restatus": 0,
                    "message": "Required checkin amount exceed the project current checked amount."}
            print("11111111111")
            return data
        else:
            data = db_project.hardware_check_in(
                hw1, hw2, p, x1, x2, hardware, project)
            print(data)
            print("222222222222")
            return data
    else:
        data = {"restatus": 0, "message": "No project found."}
        print("3333333333")
        return data


@app.route('/queryuser', methods=['POST'])
def queryUser():
    myquery = request.get_data(as_text=True)
    print(myquery)
    myquery = json.loads(myquery)
    data = db_user.db_query_user(myquery, user)
    if data['restatus'] == 1:
        user1 = User()
        print(data["username"])
        user1.id = data["username"]
        login_user(user1)
        return jsonify(data), 200
    print(data)
    return data


@login_manager.user_loader
def user_loader(username):
    user = User()
    user.id = username
    return user


@app.route('/logout', methods=['POST'])
# @login_required
def logout():
    print("asdfasdfasdfasdfasdf")
    logout_user()
    return jsonify({'message': 'Logged out'}), 200


@app.route('/user_info', methods=['GET'])
@login_required
def user_info():
    try:
        data = jsonify({'username': current_user.id, 'isLoggedIn': True})
    except:
        data = jsonify({'isLoggedIn': False}), 200
    return data


@app.route('/newuser', methods=['POST'])
def newUser():

    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    # print(myquery)

    data = db_user.create_user(myquery, user)
    print(data)

    return data


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 8000))
