import db_query
import json


def giveJson():
    myquery = {"username": "bo123", "password": "1234"}
    data = db_query.db_query_user(myquery)
    return data


data = giveJson()


data1 = {'staus': '0'}
data = {**data1, **data}
print(type(data))
json_str = json.dumps(data)

print("Python 原始数据：", repr(data))
print("JSON 对象：", json_str)
