#!/usr/bin/python3
"""
starts a Flask web application
"""
import uuid
from flask import Flask, render_template

from models import storage
app = Flask(__name__)


@app.route('/0-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all("State").values()
    return render_template('0-hbnb.html',
                           states=states,
                           cache_id=uuid.uuid4())


@app.teardown_appcontext
def teardown_db(exception):
    """closes the storage on teardown"""
    storage.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
