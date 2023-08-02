from flask import Flask, request, jsonify
from back_end import db_user
import json
from back_end import db_hardware
from back_end import db_project
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


# Create a Flask application
app = Flask(__name__, static_folder='./front_end/build', static_url_path='/')
app.secret_key = 'your_secret_key'


# Set up the login manager for managing user authentication
login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    pass


# Initialize hardware objects and database collections
hw1 = db_hardware.ini_hardware('001', hardware)
hw2 = db_hardware.ini_hardware('002', hardware)


# Define the routes and corresponding functions for the application

# Route for serving the index.html file
@app.route('/')
def index():
    return app.send_static_file('index.html')


# Route for handling 404 errors and serving the index.html file
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


# API: /hardware
# Description: Allows clients to retrieve hardware information from the server.
# Input: None (GET request)
# Output: Returns hardware information in JSON format. The output is a list of dictionaries, each representing hardware data.
@app.route('/hardware')
def giveHardware():
    data = [{}, {}]
    data[0] = db_hardware.query_hardware("001", hardware)
    data[1] = db_hardware.query_hardware("002", hardware)
    return data


# API: /newproject
# Description: Enables clients to create a new project. The current logged-in user is set as the owner of the project.
# Input: JSON data in the POST request body containing the projectID key.
# Output: Returns JSON data representing the result of creating a new project. The output includes a key 'restatus' indicating the success or failure of the operation.
@app.route('/newproject', methods=['POST'])
def newProject():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    p_ID = str(myquery["projectID"])
    data = db_project.create_project(p_ID, current_user.id, project)
    return data

# API: /queryproject
# Description: Allows clients to query existing projects based on the provided project ID and join the current user to the project in the database.
# Input: JSON data in the POST request body containing the projectID key.
# Output: Returns JSON data representing the queried project information. The output includes a key 'restatus' indicating the success or failure of the query.


@app.route('/queryproject', methods=['POST'])
def queryProject():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    p_ID = str(myquery["projectID"])
    data = db_project.query_project(p_ID, project, current_user.id)
    return data


# API: /hwcheckout
# Description: Enables clients to perform hardware checkout for a project.
# Input: JSON data in the POST request body containing projectIDCheckout, hw1Checkout, and hw2Checkout keys.
# Output: Returns JSON data representing the result of hardware checkout for a project. The output includes a key restatus indicating the success or failure of the operation.
@app.route('/hwcheckout', methods=['POST'])
def checkout():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    p_ID = str(myquery["projectIDCheckout"])
    x1 = int(myquery["hw1Checkout"])
    x2 = int(myquery["hw2Checkout"])
    p = db_project.query_project(p_ID, project, current_user.id)
    if p['restatus'] == 0:
        data = {"restatus": 0}
        return data
    else:
        data = db_project.project_check(hw1, hw2, p, x1, x2, hardware, project)
        print("jiancha")
        print(data)
        return data


# API: /hwcheckin
# Description: Allows clients to check in hardware for a project.
# Input: JSON data in the POST request body containing projectIDCheckIn, hw1Checkin, and hw2Checkin keys.
# Output: Returns JSON data representing the result of hardware check-in for a project. The output includes a key restatus indicating the success or failure of the operation.
@app.route('/hwcheckin', methods=['POST'])
def hw_checkin():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    p_ID = str(myquery["projectIDCheckIn"])
    x1 = int(myquery["hw1Checkin"])
    x2 = int(myquery["hw2Checkin"])
    p = db_project.query_project(p_ID, project, current_user.id)
    if p['restatus'] == 1:
        if x1 > p["hw1_checked"] or x2 > p["hw1_checked"]:
            data = {"restatus": 0,
                    "message": "Required checkin amount exceeds the project's current checked amount."}
            return data
        else:
            data = db_project.hardware_check_in(
                hw1, hw2, p, x1, x2, hardware, project)
            return data
    else:
        data = {"restatus": 0, "message": "No project found."}
        return data


# API: /queryuser
# Description: Enables clients to query user information based on the provided credentials.
# Input: JSON data in the POST request body containing user query information (e.g., username and password).
# Output: Returns JSON data representing the queried user information. The output includes a key restatus indicating the success or failure of the query.
@app.route('/queryuser', methods=['POST'])
def queryUser():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    data = db_user.db_query_user(myquery, user)
    if data['restatus'] == 1:
        user1 = User()
        user1.id = data["username"]
        login_user(user1)
        return jsonify(data), 200
    return data


# Function: user_loader(username)
# Description: Part of Flask-Login's functionality. Takes a username as input and returns a User object representing the logged-in user.
# Input: The function takes the username of the user as input.
# Output: Returns a User object that represents the logged-in user.
@login_manager.user_loader
def user_loader(username):
    user = User()
    user.id = username
    return user


# API: /logout
# Description: Allows users to log out of the application.
# Input: None (POST request)
# Output: Returns a JSON message indicating that the user has been successfully logged out.
@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200


# API: /user_info
# Description: Allows clients to retrieve information about the currently logged-in user.
# Input: None (GET request)
# Output: Returns JSON data containing information about the currently logged-in user. The output includes a key username with the username of the logged-in user and a key isLoggedIn indicating whether the user is logged in or not.
@app.route('/user_info', methods=['GET'])
@login_required
def user_info():
    try:
        data = jsonify({'username': current_user.id, 'isLoggedIn': True})
    except:
        data = jsonify({'isLoggedIn': False}), 200
    return data


# API: /newuser
# Description: Enables clients to create a new user account.
# Input: JSON data in the POST request body containing new user information (e.g., username, password, etc.).
# Output: Returns JSON data representing the result of creating a new user. The output includes a key restatus indicating the success or failure of the operation.
@app.route('/newuser', methods=['POST'])
def newUser():
    myquery = request.get_data(as_text=True)
    myquery = json.loads(myquery)
    data = db_user.create_user(myquery, user)
    return data


# Start the Flask application on the specified host and port
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=os.environ.get(
        'PORT', 8000))
