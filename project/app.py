from flask import Flask, render_template, request, redirect, flash, url_for, Response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import urllib2
import json
import datetime
import hashlib
import urllib2
import os, smtplib, email
import requests
import random
from orion import orion



#create a flask instance, wrap in boostrap
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://academypgh:breakfastatshellys@warringtons.crqrglgmlxa2.us-east-1.rds.amazonaws.com/warringtons'
db = SQLAlchemy(app)
CORS(app)

#set a secret key
app.secret_key = ')oA\x12IYX\xab\xa9\xb2\xc1\xc0vj\xc1a\x8e\xd5>i\xf0\xa9 \x1f'
app.site_key = ')oA\x12IYX\xab\xa9\xb2\xc1\xc0vj\xc1a\x8e\xd5>i\xf0\xa9 \x1f'

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

    def __init__(self, lat, lng, zipcode, story, diagnosis):
        self.lat = lat
        self.lng = lng
        self.zipcode = zipcode
        self.story = story
        self.diagnosis = diagnosis
        self.datetime = (str(datetime.datetime.now())).split('.', 1)[0] #truncates to make mysql datatype valid
    #this method gets the pin of the user
#request.form.to.dict() consolidates all form inputs into a dict with the name of each input used as the key in the key input pair
#adds and commits new object to db

from stories import *

@app.route('/getpin', methods=['POST'])
def getpin():
        if request.method == 'POST':
            pin = request.form.to_dict()
            up = UserPin(random.choice(orion)[1], random.choice(orion)[0], '15213', pin['story'], pin['diagnosis'])
            db.session.add(up)
            db.session.commit()
        return redirect(url_for('index'))



    ##db.session.add(--python Userpin instance--)
    ##db.session.commit() --these two in a row to add entry to database


#default route to test screen
@app.route('/')
def index():
    return render_template('index.html')



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
    return render_template('index.html', pins=pins)


@app.route('/Home')
def home():
    return render_template('index.html')

@app.route('/Story')
def story():
    return render_template('story.html')

@app.route('/About')
def about():
    return render_template('about.html')

@app.route('/Love')
def love():
    depressions = getDepressions()
    return render_template('love.html', depressions = depressions)

@app.route('/Help')
def contact():
    return render_template("help.html")

@app.route('/Admin')
def admin():
    pins = UserPin.query.all()
    return render_template('admin.html', pins=pins)



#run flask app
if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
