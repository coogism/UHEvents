from flask import Flask
from flask_cors import CORS, cross_origin

from waitress import serve

import datetime
import requests

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

events_url = "https://getinvolved.uh.edu/api/discovery/event/search?endsAfter={isoDate}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take=15&query=&skip={skipPage}"

@app.route("/events/<int:page>", methods=['GET'])
def get_events(page : int):
    print(page)
    x = requests.get(events_url.format(isoDate = datetime.datetime.now().isoformat(), skipPage = (page - 1) * 15))

    events = x.json()["value"]

    print(x.json()["value"])
    return x.json()["value"]



if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8080)