import os

from flask import Flask, request, jsonify
from service import ImageService

from models import db, connect_db

app = Flask(__name__)

uri = os.environ.get("DATABASE_URL", "postgresql:///reactor")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_DATABASE_URI"] = uri

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "secret")
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)

@app.route("/images", methods=["GET"])
def get_images():
    "Get Images base on page number"
    return jsonify(ImageService.get_images(1))

