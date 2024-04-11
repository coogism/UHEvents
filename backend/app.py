from flask import Flask
from waitress import serve

import requests

app = Flask(__name__)

events_url = "https://getinvolved.uh.edu/api/discovery/event/search"

@app.route("/")
def index():
    x = requests.get(events_url)
    return x.json()



if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8080)