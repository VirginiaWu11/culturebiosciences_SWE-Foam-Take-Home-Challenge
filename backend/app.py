import os

from flask import Flask, request, jsonify

from models import db, connect_db

app = Flask(__name__)

uri = os.environ.get("DATABASE_URL", "postgresql:///reactor")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_DATABASE_URI"] = uri

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "secret")
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)
