import threading

from flask import Flask
from flask_cors import CORS, cross_origin

from waitress import serve

import mongodb

import datetime
import requests

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

events_url = "https://getinvolved.uh.edu/api/discovery/event/search?endsAfter={isoDate}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=&skip={skipPage}"
event_orgs_url = "https://getinvolved.uh.edu/api/discovery/event/{eventId}/organizations"
org_url = "https://getinvolved.uh.edu/api/discovery/organization/{orgId}"

database = mongodb.get_database()

def saveEventToDatabase(event):
    event["organizerInfos"] = get_orgs_from_event(event["id"]) 
    
    record = database["events"].find_one({'id' : event["id"] })
    if record == None:
        database["events"].insert_one(event)

@app.route("/events/<int:page>", methods=['GET'])
def get_events(page : int):
    # print(page)
    x = requests.get(events_url.format(isoDate = datetime.datetime.now().isoformat(), skipPage = (page - 1) * 15))

    events = x.json()["value"]

    threads = []

    for event in events:
        threads.append(threading.Thread(target=saveEventToDatabase, args=(event,)))

    # Start all threads.
    for t in threads:
        t.start()

    # Wait for all threads to finish.
    for t in threads:
        t.join()

    return events

@app.route("/event/<string:event_id>/organization", methods=['GET'])
def get_orgs_from_event(event_id : str):
    record = database["events"].find_one({'id' : event_id })
    if record != None:
        return record["organizerInfos"]

    formatUrl = event_orgs_url.format(eventId = event_id)
    x = requests.get(formatUrl)

    return x.json()

@app.route("/organization/<string:org_id>", methods=["GET"])
def get_org_ratings(org_id : str):
    record = database["organizations"].find_one({'_id' : org_id })
    
    if record == None:
        formatUrl = org_url.format(orgId = org_id)
        org_got = requests.get(formatUrl)

        if org_got.status_code == 200:
            org_data = org_got.json()

            print(org_data)

            record = { "_id": org_id,
            "name": org_data["name"],
            "email": org_data["email"],
            "socialMedia": org_data["socialMedia"],
            "profilePicture" : org_data["profilePicture"],
            "contactInfo" : org_data["contactInfo"],
            "ratings" : []
            }

            database["organizations"].insert_one(record)

    return record

if __name__ == "__main__":
    print("server started")
    serve(app, host="0.0.0.0", port=8080)