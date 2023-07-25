# import datetime

from pymongo import MongoClient
import certifi
from hardwareSet import HWSet
import db_hardware

# uri = "mongodb+srv://bo317:1234@cluster0.yrpm09t.mongodb.net/?retryWrites=true&w=majority"
# ca = certifi.where()
# # Use Cluster0
# client = MongoClient(uri, tlsCAFile=ca)


# db = client.test
# project = db.projects


def create_project(p_id, project):
    projectDocument = {
        "pID": p_id,
        "hw1_checked": 0,
        "hw2_checked": 0
    }
    myquery = {"pID": p_id}
    x = project.find_one(myquery)

    print(x)

    try:
        if (x["pID"]) == p_id:
            return {"restatus": 0}

    except:
        project.insert_one(projectDocument)
        return {"restatus": 1}


def query_project(p_id, project):
    restatus = {'restatus': 0}
    myquery = {"pID": p_id}
    try:
        data = project.find_one(myquery)
        data.pop('_id')
        restatus['restatus'] = 1
    except:
        return restatus
    data = {**restatus, **data}
    return data


def update_project(new_data, project):
    print("1111")
    myquery = {"pID": new_data['pID']}
    newvalues = {"$set": {"hw1_checked": new_data["hw1_checked"],
                          "hw2_checked": new_data["hw2_checked"]}}

    try:
        project.update_one(myquery, newvalues)
        return 1
    except:
        return 0


def project_check(hw1, hw2, p, x1, x2, hardware, project):

    err1 = hw1.check_out(x1)
    err2 = hw2.check_out(x2)
    print("p", p, err1, err2)
    if err1 == 1:
        try:
            p["hw1_checked"] += x1
            # print(p)
            update_project(p, project)
            # print("successfully updated project")
            db_hardware.update_hardware(hw1, hardware)
            print("Hw1 successfully checked out")
        except:
            print("Hw1 wrong")
            return_msg = db_hardware.sync_hardware('001', hardware, hw1)
            err1 = 0

    if err2 == 1:
        try:
            p["hw2_checked"] += x2
            update_project(p, project)
            db_hardware.update_hardware(hw2, hardware)
            print("Hw2 successfully checked out")
        except:
            print("Hw2 wrong")
            return_msg = db_hardware.sync_hardware('002', hardware, hw2)
            err2 = 0

    if err1 == 1 and err2 == 1:
        return {"restatus": 1}
    else:
        return {"restatus": 0}


def hardware_check_in(hw1, hw2, p, x1, x2, hardware, project):

    re1 = hw1.check_in(x1)
    re2 = hw2.check_in(x2)
    print("p", p, re1, re2)
    if re1 == 1:
        try:
            p["hw1_checked"] -= x1
            # print(p)
            update_project(p, project)
            # print("successfully updated project")
            db_hardware.update_hardware(hw1, hardware)
            print("Hw1 successfully checked out")
        except:
            print("Hw1 wrong")
            return_msg = db_hardware.sync_hardware('001', hardware, hw1)
            re1 = 0

    if re2 == 1:
        try:
            p["hw2_checked"] -= x2
            update_project(p, project)
            db_hardware.update_hardware(hw2, hardware)
            print("Hw2 successfully checked out")
        except:
            print("Hw2 wrong")
            return_msg = db_hardware.sync_hardware('002', hardware, hw2)
            re2 = 0

    if re1 == 1 and re2 == 1:
        return {"restatus": 1}
    else:
        return {"restatus": 0}
