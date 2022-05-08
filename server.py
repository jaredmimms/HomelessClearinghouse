import os
import datetime

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from flask_cors import CORS, cross_origin
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__, template_folder='templates')

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

Session(app)
CORS(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///offers.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    response.headers["Access-Control-Allow-Origin"] = 'http://localhost:8080'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'POST,GET,PUT,DELETE'
    return response

@app.route("/", methods=["GET"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def index():
    return render_template("index.html")

@app.route("/auth", methods=["POST"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def auth():
    print(session.get("user_id"))
    if request.method == "POST" and session.get("user_id"):
        information = db.execute(
                            "SELECT * FROM users WHERE id = ?", session.get("user_id"))
        if information and information[0]:
            authentication = {'authenticated': True, 'user': {'id': session.get("user_id"), 'name': information[0]['name']}}
        else:
            authentication = {'authenticated': False}
        return jsonify(authentication)
    else:
        return jsonify({'authenticated': False})

@app.route("/offer", methods=["GET", "POST"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def offer():
    if request.method == "GET":
        offers = db.execute("SELECT * FROM offers")
        return jsonify({"offers": offers})
    elif request.method == "POST" and session.get("user_id"):
        data = request.get_json(silent=True)
        offer = data.get("offer")
        offer_id = db.execute("INSERT INTO offers (title, content, tags, featured) VALUES(?, ? , ?, ?)", offer['title'], offer['content'], offer['tags'], offer['featured'])
        return jsonify({'offer' : { 'id' : offer_id}})

@app.route('/offerput/<offer_id>', methods=["PUT"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def offerPut(offer_id):
    if session.get("user_id"):
        data = request.get_json(silent=True)
        offer = data.get("offer")
        db.execute("UPDATE offers SET title = ?, content = ?, tags = ?, featured = ? WHERE id = ?", offer['title'], offer['content'], offer['tags'], offer['featured'], offer_id)
        return jsonify({"success" : True})

@app.route('/offerdelete/<offer_id>', methods=["DELETE"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def offerDelete(offer_id):
    if session.get("user_id"):
        db.execute("DELETE FROM offers WHERE id = ?", offer_id)
        return jsonify({"success" : True})

@app.route("/login", methods=["POST"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        data = request.get_json(silent=True)
        # Ensure username was submitted
        if not data.get('email'):
            return jsonify({'errors': ["No email"]})

        # Ensure password was submitted
        elif not data.get('password'):
            return jsonify({'errors': ["No password"]})

        # Query database for email
        rows = db.execute("SELECT * FROM users WHERE email = ?",
                          data.get('email'))

        # Ensure email exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["password"], data.get('password')):
            return jsonify({'errors': ["Wrong password"]})

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        session.modified = True

        # Redirect user to home page
        return jsonify({'authenticated' : True, 'user' : rows[0]})


@app.route("/logout", methods=["POST"])
@cross_origin(origin='http://localhost:8080',headers=['Content-Type','Authorization'],supports_credentials=True)
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()
    session.modified = True

    # Redirect user to login form
    return jsonify({'success' : True})