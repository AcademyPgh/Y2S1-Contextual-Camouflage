#import flask, flask extensions and flask functions
from flask import Flask, request, redirect, jsonify, render_template, flash, url_for, Response
from flask_sqlalchemy import SQLAlchemy
#import helpers
import json
import datetime
#import local functions and variables
from userpins import addPin, approvePin, denyPin, pinsToJsonDb, object_as_dict
#import secret keys and such
from config import *

#create a flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://academypgh:breakfastatshellys@warringtons.crqrglgmlxa2.us-east-1.rds.amazonaws.com/warringtons'
db=SQLAlchemy(app)


class UserPin(db.Model):
    __tablename__='contycamo2'
    id = db.Column('id', db.INT, primary_key=True)
    lat = db.Column('lat', db.VARCHAR(45))
    lng = db.Column('lng', db.VARCHAR(45))
    zipcode = db.Column('zipcode', db.VARCHAR(45))
    story = db.Column('story', db.VARCHAR(255))
    diagnosis = db.Column('diagnosis', db.VARCHAR(45))
    datetime = db.Column('datetime', db.VARCHAR(45))

    def __init__(self, id, lat, lng, zipcode, story, diagnosis):
        self.id = id
        self.lat = lat
        self.lng = lng
        self.zipcode = zipcode
        self.story = story
        self.diagnosis = diagnosis
        self.datetime = (str(datetime.datetime.now())).split('.', 1)[0] #truncates to make mysql datatype valid

    ##db.session.add(--python Userpin instance--)
    ##db.session.commit() --these two in a row to add entry to database

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
        up = UserPin(pin['id'], pin['lat'], pin['lng'], pin['zipcode'], pin['story'], pin['diagnosis'])
        db.session.add(up)
        db.session.commit()
        addPin(pin)
    return redirect(url_for('index'))

#when the addPin function appends the new pin, it writes the whole object out to a text file.
#the text file is read back here, prepared as a results, and jsonify-ed
#will replace with more DB ways of doing it

@app.route('/givejson')
def givejson():
    with open('data.txt', 'r') as f:
        resp = json.load(f)
        print(resp)
    return jsonify(results=resp)


#OH FUCK YES THIS WORKS
@app.route('/givejsondb')
def givejsondb():
    pins = UserPin.query.all()
    currentPins={}
    currentPins['pinobj'] =[]
    for j in pins:
        gdpn = j.__dict__
        gdpn2 = dict([(str(k), str(v)) for k, v in gdpn.items()])
        currentPins['pinobj'].append(gdpn2)
    jpd=currentPins['pinobj']
    return Response(json.dumps(jpd), mimetype='application/json')

@app.route('/giveapproved')
def giveapproved():
    with open('data-approved.txt', 'r') as f:
        resp = json.load(f)
        print(resp)
    return jsonify(results=resp)

#approve and deny pins

@app.route('/approvePin/<n>')
def approve(n):
    approvePin(int(n))
    return redirect(url_for('index'))

@app.route('/denyPin/<n>')
def deny(n):
    denyPin(int(n))
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.secret_key = SECRET_KEY
    app.debug = True
    app.run()
