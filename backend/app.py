import threading

from flask import Flask, request, jsonify, abort
from flask_cors import CORS, cross_origin

from waitress import serve

import mongodb

import datetime
import requests

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

events_url = "https://getinvolved.uh.edu/api/discovery/event/search?endsAfter={isoDate}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=&skip={skipPage}"
events_search_url = "https://getinvolved.uh.edu/api/discovery/event/search?endsAfter={isoDate}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query={query}&skip={skipPage}"
event_orgs_url = "https://getinvolved.uh.edu/api/discovery/event/{eventId}/organizations"
org_url = "https://getinvolved.uh.edu/api/discovery/organization/{orgId}"

database = mongodb.get_database()

def saveEventToDatabase(event):
    event["organizerInfos"] = get_orgs_from_event(event["id"]) 
    
    record = database["events"].find_one({'id' : event["id"] })
    if record == None:
        database["events"].insert_one(event)

    for orgInfo in event["organizerInfos"]:
        # print(orgInfo["id"])
        orgInfo["ratings"] = get_org_info(str(orgInfo["id"]))["ratings"]

@app.route("/events/search", methods=['GET'])
def search_events():
    query = request.args.get('query')
    page = request.args.get('page')

    print(query, page)

    skipPage = (int(page) - 1) * 15

    x = requests.get(events_search_url.format(isoDate = datetime.datetime.now().isoformat(), query = query, skipPage = skipPage))

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

    return {
        "total" : x.json()["@odata.count"],
        "events" : events
    }
    

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

@app.route("/events-info", methods=['GET'])
def get_events_info():
    x = requests.get("https://getinvolved.uh.edu/api/discovery/event/search?endsAfter=" + datetime.datetime.now().isoformat())
    # print(x)

    return {
        "total" : x.json()["@odata.count"]
    }

@app.route("/event/<string:event_id>/organization", methods=['GET'])
def get_orgs_from_event(event_id : str):
    record = database["events"].find_one({'id' : event_id })
    if record != None:
        return record["organizerInfos"]

    formatUrl = event_orgs_url.format(eventId = event_id)
    x = requests.get(formatUrl)

    return x.json()

@app.route("/organization/<string:org_id>", methods=["GET"])
def get_org_info(org_id : str):
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

@app.route("/rate/organization", methods=["POST"])
def rate_org():
    data = request.json
    print(data)
    rating = data["rating"]
    org_id = data["org_id"]

    print(org_id)

    record = database["organizations"].find_one({'_id' : org_id })
    if record == None:
        abort(404)

    if rating == None:
        abort(404)

    if type(rating) is int:
        if rating > 0 and rating <= 5:
            record["ratings"].append({
                "rating" : rating
            })
            database["organizations"].replace_one({'_id': record['_id']}, record)


    return jsonify(success=True)

@app.route("/location", methods=["GET"])
def search_building():
    location_term = request.args.get('term')
    x = requests.get("https://www.uh.edu/cdn/map/api/autocomplete.php?term=" + location_term)
    return x.json()

if __name__ == "__main__":
    print("server started")
    serve(app, host="0.0.0.0", port=8080, threads=100)