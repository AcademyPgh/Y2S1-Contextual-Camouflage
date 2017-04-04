import json

userPins = {}
userPins['pinobj'] = []
pinApproved = []

#writes the pins to a txt file that can be returned on a route as a json object
def pinsToJson(n):
    with open('data.txt', 'w') as outfile:
        json.dump(n, outfile)

def approvedToJson(n):
    with open('data-approved.txt', 'w') as outfile:
        json.dump(n, outfile)

def addPin(n):
    userPins['pinobj'].append(n)
    print(userPins)
    pinsToJson(userPins)

def giveApprovedPins(pinApproved):
    approvedToJson(pinApproved)

#will clear out the story part of a pin before moving it on the approved object
#this won't work but figure out how to do it
def denyPin(n):
    x = int(n)
    userPins['pinobj'][x]['story'] = ''
    f = userPins['pinobj'][x]
    pinApproved.append(f)

#approves pins with no edits
def approvePin(n):
    x = int(n)
    f = userPins['pinobj'][x]
    pinApproved.append(f)
