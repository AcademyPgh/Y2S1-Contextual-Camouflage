#import flask and flask functions
from flask import Flask, request, redirect, jsonify, render_template, flash, url_for
#import helpers
import json
#import local functions and variables
from userpins import addPin, approvePin, denyPin
#import secret keys and such
from config import *
import urllib2

#create a flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE-URL'] =''

f = urllib2.urlopen('http://freegeoip.net/json/')
json_string = f.read()
f.close()
location = json.loads(json_string)
print(location['city']+ " "+location['region_code']+" "+ location['zip_code'])

#default route to test screen

@app.route('/')
def index():
    return render_template('index.html')

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
    return render_template('love.html')

@app.route('/Help')
def contact():
    return render_template("help.html")



@app.route('/Admin')
def admin():
    return render_template('admin.html')

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template('index.html')

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

@app.route('/Share', methods = ['POST', 'GET'])
def result():
    if request.method == 'POST':
        result = request.form['Mental Illness']
        text =  request.form['text']
        print(result+ ' '+ text)
        return render_template("pagetwo.html", result = result)

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
