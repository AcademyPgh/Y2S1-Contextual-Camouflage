#import flask, flask extensions and flask functions
from flask import Flask, request, redirect, jsonify, render_template, flash, url_for, Response
from flask_sqlalchemy import SQLAlchemy
#import helpers
import json
import datetime
#import secret keys and such
from config import *

#create a flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
db=SQLAlchemy()

#define UserPin Model for SQLAlchemy
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
#adds and commits new object to db
@app.route('/getpin', methods=['POST'])
def getpin():
    if request.method == 'POST':
        pin = request.form.to_dict()
        up = UserPin(pin['id'], pin['lat'], pin['lng'], pin['zipcode'], pin['story'], pin['diagnosis'])
        db.session.add(up)
        db.session.commit()
        addPin(pin)
    return redirect(url_for('index'))


#query.all creates a SQL alchemy object
#each row in the object has an interal __dict__ type
#the dict's keys and values are converted to strings from unicode
#and serialized to an a array located in a new dict
#the dict is formatted to json syntax and given the appropriate headers and returned
@app.route('/givejsondb')
def givejsondb():
    pins = UserPin.query.all()
    currentPins={}
    currentPins['pinobj'] =[]
    for j in pins:
        gdpn = j.__dict__
        gdpn2 = dict([(str(k), str(v)) for k, v in gdpn.items()])
        currentPins['pinobj'].append(gdpn2)
    jpd=currentPins
    return Response(json.dumps(jpd), mimetype='application/json')

#to have the pins available as a local flask variables
#these variables can be invoked in HTML templates by using {{these brackets}}
@app.route('/givepins')
def givepins():
    pins = UserPin.query.all()
    return render_template('pins.html', pins=pins)


if __name__ == '__main__':
    db.init_app(app)
    app.secret_key = SECRET_KEY
    app.debug = True
    app.run()
