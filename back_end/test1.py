from flask import Flask, request
import db_user
import json
from hardwareSet import HWSet
import db_hardware
import db_project


hw1 = db_hardware.ini_hardware('001')
hw2 = db_hardware.ini_hardware('002')


p = db_project.query_project("0001")

print(p)


# db_project.project_check(hw1, hw2, p, 100, 500)
print(db_project.query_project("0001"))
print(db_project.query_project("0002"))
print(db_hardware.query_hardware("001"))
print(db_hardware.query_hardware("002"))
