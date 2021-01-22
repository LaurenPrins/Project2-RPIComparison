import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from password import pw
import json


from flask import Flask, jsonify, render_template


path = 'postgresql://postgres:' + pw + '@localhost:5432/rpi_comp'

engine = create_engine(path)
conn = engine.connect()

# Access our DB through pandas dataframe - convert to json - record oriented
data = pd.read_sql("SELECT * FROM rpi", conn).to_json(orient='records')

# Access database through sql alchemy
# db = engine.execute('SELECT * FROM "rpi"').fetchall()

# Create Session
session = Session(engine)

# Create Flask connection
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/rpi_comp")
def database():
    """Return the rpi_comp db"""
# Convert string to json 

    data_json = json.loads(data)

    return jsonify(data_json)


@app.route("/") 
def welcome():
    return (
        f"Regional Price Index Analysis!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/rpi_comp"
    )   


@app.route("/index")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)


# Could this database be accessed in this method?

# DB through sql lite method
# reflect an existing database into a new model

# Base = automap_base()
# reflect the tables
# Base.prepare(engine, reflect=True)

# Accessing different tables
# Measurement = Base.classes.measurement
# Station = Base.classes.station



# Performing a query - Session.query
