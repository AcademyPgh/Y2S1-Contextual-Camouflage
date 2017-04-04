#import flask, flask extensions and flask functions
from flask import Flask, request, redirect, jsonify, render_template, flash, url_for
from flask_sqlalchemy import SQLAlchemy
#import helpers
import json
#import local functions and variables
from userpins import addPin, approvePin, denyPin
#import secret keys and such
from config import *

#create a flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://academypgh:breakfastatshellys@warringtons.crqrglgmlxa2.us-east-1.rds.amazonaws.com/warringtons'
db=SQLAlchemy(app)

class UserPin(db.Model):
    __tablename__='example'
    id = db.Column('id', db.INT, primary_key=True)
    data = db.Column('data', db.VARCHAR(100))

    def __init__(self, id, data):
        self.id = id
        self.data = data

#default route to test screen
@app.route('/')
def index():
    return render_template('index.html')

#this method gets the pin of the user
#request.form.to.dict() consolidates all form inputs into a dict with the name of each input used as the key in the key input pair
#the function addPin appends the dict to an array at index 0 of a dict called userPins
@app.route('/getpin', methods=['POST'])
def getpin():
    if request.method == 'POST':
        pin = request.form.to_dict()
        addPin(pin)
    return redirect(url_for('index'))

#when the addPin function appends the new pin, it writes the whole object out to a text file.
#the text file is read back here, prepared as a results, and jsonify-ed
@app.route('/givejson')
def givejson():
    with open('data.txt', 'r') as f:
        resp = json.load(f)
        print(resp)
    return jsonify(results=resp)

@app.route('/giveapproved')
def giveapproved():
    with open('data-approved.txt', 'r') as f:
        resp = json.load(f)
        print(resp)
    return jsonify(results=resp)

#approve and deny pins

@app.route('/approvePin/<n>')
def approve(n):
    approvePin(n)
    return redirect(url_for('index'))

@app.route('/denyPin/<n>')
def deny(n):
    x = int(n)
    denyPin(x)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.secret_key = SECRET_KEY
    app.debug = True
    app.run()
