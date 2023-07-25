from flask import Flask, request
from flask_cors import CORS
import db_user
import db_hardware
import db_project
import json
app = Flask(__name__)
CORS(app, supports_credentials=True)

hw1 = db_hardware.ini_hardware('001')
hw2 = db_hardware.ini_hardware('002')


@app.route('/')
def sayHello():
    return 'Hello Python'


@app.route('/hi')
def sayHi():
    return ('<h1>Hi Flask</h1>')


@app.route('/message')
def message():
    return 'This is a message from python'


@app.route('/user')
def giveUser():
    myquery = {"username": "bo123"}
    data = db_user.db_query_user(myquery)
    # data = json.dumps(db_query.db_query_user(myquery))

    return data


@app.route('/hardware')
def giveHardware():
    data = db_hardware.query_hardware("001")

    return data


@app.route('/alluser')
def giveAllUser():
    return db_query.db_query_all()
    # data = json.dumps(db_query.db_query_user(myquery))

    return data


@app.route('/json')
def giveJson():
    data = {'today': 'Fifth'}
    return data


@app.route('/modify', methods=['POST'])
def giveModify():
    data = request.get_data(as_text=True)
    data = "I have recived this message from you: " + data
    return data


# user = giveUser()
# jj = giveJson()
# print(type(user), type(jj))
if __name__ == "__main__":
    app.run(debug=True)
