# Importing the db_hardware module
from back_end import db_hardware
# import copy

# Function to join a user to an existing project in the database


def joinProject(pjt_id, project_collection, newmember):
    try:
        myquery = {"pID": pjt_id}
        newvalues = {"$addToSet": {"member": newmember}}
        project_collection.update_one(myquery, newvalues)
        return {'restatus': 1, 'message': "Joined the project."}
    except:
        return {'restatus': 0, 'message': "Failed to join the project"}

    # result = query_project(pjt_id, project_collection, newmember)
    # if result['restatus'] == 1:
    #     if newmember in result["member"]:
    #         return {'restatus': 0, 'message': "This user is already a mamber"}
    #     else:
    #         myquery = {"pID": pjt_id}
    #         newvalues = {"$addToSet": {"member": newmember}}
    #         project_collection.update_one(myquery, newvalues)
    #         return {'restatus': 1, 'message': "Joined the project."}
    # else:
    #     return {'restatus': 0, 'message': "No project found"}

# Function to create a new project document in the database


def create_project(p_id, owner, project):
    # Creating a new project document with the provided project ID and initial checked hardware counts set to 0
    projectDocument = {
        "pID": p_id,
        "hw1_checked": 0,
        "hw2_checked": 0,
        "owner": owner,
        "member": [owner]
    }
    myquery = {"pID": p_id}
    x = project.find_one(myquery)

    print(x)

    try:
        # Checking if a project with the provided project ID already exists
        if (x["pID"]) == p_id:
            # Return 0 to indicate that the project already exists
            return {"restatus": 0}

    except:
        project.insert_one(projectDocument)
        # Return 1 to indicate successful creation of the project
        return {"restatus": 1}


# Function to query project information from the database based on the provided project ID
def query_project(p_id, project, current_user):
    restatus = {'restatus': 0}  # Default status set to 0 (no project found)
    myquery = {"pID": p_id}
    try:
        # Querying the project information from the 'project' collection
        data = project.find_one(myquery)
    # Removing the '_id' field from the document to make it more readable
        data.pop('_id')
    # Setting status to 1 to indicate a successful query
        joinProject(p_id, project, current_user)
        restatus['restatus'] = 1
    except Exception as inst:
        print(inst)
        return restatus  # Return the status (no project found)
    # Merging the status with the retrieved project data
    data = {**restatus, **data}
    return data  # Return the project data with the status


# Function to update project information in the database
def update_project(new_data, project):
    myquery = {"pID": new_data['pID']}
    newvalues = {
        "$set": {
            "hw1_checked": new_data["hw1_checked"],
            "hw2_checked": new_data["hw2_checked"]
        }
    }

    try:
        # Updating the project document with the new values
        project.update_one(myquery, newvalues)
        return 1  # Return 1 to indicate successful update
    except:
        return 0  # Return 0 to indicate a failed update


# Function to perform hardware checkout for a project
def project_check(hw1, hw2, p, x1, x2, hardware, project):
    # orgin_hw1 = copy.deepcopy(hw1)
    # orgin_hw2 = copy.deepcopy(hw2)
    re1 = hw1.check_out(x1)  # Checking out hardware 1 for the project
    re2 = hw2.check_out(x2)  # Checking out hardware 2 for the project

    print("check out test!!!!!!!!")
    print("p", p, re1, re2)
    print(x1, x2, "hw1", hw1.get_availability(), "hw2", hw2.get_availability())

    if re1 == 1 and re2 == 1:  # If hardware 1 and 2 checkout are successful
        try:
            # Update the checked quantity for hardware 1 in the project
            p["hw1_checked"] += x1
            # Update the checked quantity for hardware 2 in the project
            p["hw2_checked"] += x2
            update_project(p, project)  # Update the project in the database
            # Update the hardware information in the database
            db_hardware.update_hardware(hw1, hardware)
            # Update the hardware information in the database
            db_hardware.update_hardware(hw2, hardware)
            print("HW successfully checked out")
            # Return 1 to indicate a successful hardware checkout
            return {"restatus": 1}
        except:
            print("Check out wrong")
            # Return 0 to indicate a failed hardware checkout
            return {"restatus": 0}
    else:
        # hw1 = orgin_hw1
        # hw2 = orgin_hw2
        # If an error occurs during the update, try to sync hardware 1 information with the database
        re_hw1 = db_hardware.sync_hardware('001', hardware, hw1)
        # If an error occurs during the update, try to sync hardware 2 information with the database
        re_hw2 = db_hardware.sync_hardware('002', hardware, hw2)
        # Return 0 to indicate a failed hardware checkout
        return {"restatus": 0}


# Function to perform hardware check-in for a project
def hardware_check_in(hw1, hw2, p, x1, x2, hardware, project):
    re1 = hw1.check_in(x1)  # Checking in hardware 1 for the project
    re2 = hw2.check_in(x2)  # Checking in hardware 2 for the project
    print("check in test!!!!!!!!")
    print("p", p, re1, re2)
    print(x1, x2, "hw1", hw1.get_availability(), "hw2", hw2.get_availability())

    if re1 == 1 and re2 == 1:  # If hardware 1 and 2 check-in are successful
        try:
            # Update the checked quantity for hardware 1 in the project
            p["hw1_checked"] -= x1
            # Update the checked quantity for hardware 2 in the project
            p["hw2_checked"] -= x2
            update_project(p, project)  # Update the project in the database
            # Update the hardware information in the database
            db_hardware.update_hardware(hw1, hardware)
            # Update the hardware information in the database
            db_hardware.update_hardware(hw2, hardware)

            print("HW successfully checked in")
            # Return 1 to indicate a successful hardware check-in
            return {"restatus": 1}

        except:
            print("Check in wrong")
            # Return 0 to indicate a failed hardware check-in
            return {"restatus": 0}

    else:
        # If an error occurs during the update, try to sync hardware 1 information with the database
        return_msg = db_hardware.sync_hardware('001', hardware, hw1)
        # If an error occurs during the update, try to sync hardware 2 information with the database
        return_msg = db_hardware.sync_hardware('002', hardware, hw2)
        # Return 0 to indicate a failed hardware check-in
        return {"restatus": 0}
