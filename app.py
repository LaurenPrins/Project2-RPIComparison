
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from flask import Flask, jsonify


connect = 'postgresql://postgres:postgres@localhost:5432/RPI'

engine = create_engine(connect)

# Test data base connection
#result_set = engine.execute('SELECT * FROM "RPI"')  
#for r in result_set:  
#    print(r)


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
regi_index = Base.classes.RPI

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/town_locality<br/>"
        f"/api/v1.0/rpi"
    )


#@app.route("/api/v1.0/town_locality")
#def town():
    # Create our session (link) from Python to the DB
#    session = Session(engine)

#    """Return a list of all passenger names"""
    # Query all towns
#    results = session.query(Passenger.name).all()

#    session.close()

    # Convert list of tuples into normal list
#    all_names = list(np.ravel(results))
#
#    return jsonify(all_names)


@app.route("/api/v1.0/rpi")
def regi_index():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(RPI.town_locality, RPI.region, RPI.year).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    full_rpi = []
    for town_locality, region, year in results:
        rpi_dict = {}
        rpi_dict["TOWN_LOCALITY"] = town_locality
        rpi_dict["REGION"] = region
        rpi_dict["YEAR"] = year
        full_rpi.append(rpi_dict)

    return jsonify(full_rpi)


if __name__ == '__main__':
    app.run(debug=True)
