import json

userPins = {}
userPins['pinobj'] = []
pinApproved = []

userPins2 = {}
userPins2['pinobj'] = []

#writes the pins to a txt file that can be returned on a route as a json object
def pinsToJson(n):
    with open('data.txt', 'w') as outfile:
        json.dump(n, outfile)

def pinsToJsonDb(n):
    with open('data-db.txt', 'w') as outfile:
        json.dump(n, outfile)

def addPin(n):
    userPins['pinobj'].append(n)
    print(userPins)
    pinsToJson(userPins)

def giveApprovedPins(pinApproved):
    approvedToJson(pinApproved)

#will clear out the story part of a pin before moving it on the approved object
#i think this works now
def denyPin(n):
    userPins['pinobj'][int(n)]['story'] = ''
    f = userPins['pinobj'][int(n)]
    pinApproved.append(f)

#approves pins with no edits
def approvePin(n):
    f = userPins['pinobj'][int(n)]
    pinApproved.append(f)

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
        for c in inspect(obj).mapper.column_attrs}
