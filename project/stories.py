from app import db
from app import UserPin

depressions = UserPin.query.filter_by(diagnosis='Depression').all()
anxietys = UserPin.query.filter_by(diagnosis='Anxiety').all()
bipolars = UserPin.query.filter_by(diagnosis='Bipolar Disorder').all()
dementias = UserPin.query.filter_by(diagnosis='Dementia').all()
autisms = UserPin.query.filter_by(diagnosis='Autism').all()
adhds = UserPin.query.filter_by(diagnosis='Attention Deficit/Hyperactivity Disorder').all()
ptsds = UserPin.query.filter_by(diagnosis='Post Traumatic Stress Disorder').all()
shcizos = UserPin.query.filter_by(diagnosis='Schizophrenia').all()

def getDepressions():
    deparray = []
    for j in depressions:
        dep = j.__dict__
        depClean = dict([(str(k), str(v)) for k, v in dep.items()])
        deparray.append(depClean)
    return deparray
