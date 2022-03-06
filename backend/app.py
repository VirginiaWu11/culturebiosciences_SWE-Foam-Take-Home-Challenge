import os

from flask import Flask, request, jsonify
from service import ImageService
from flask_cors import CORS

from models import db, connect_db

app = Flask(__name__)

uri = os.environ.get("DATABASE_URL", "postgresql:///reactor")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_DATABASE_URI"] = uri

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "secret")
app.config["SQLALCHEMY_ECHO"] = False

CORS(app)
connect_db(app)

@app.route("/images", methods=["GET"])
def get_images():
    "Get Images base on page number"
    page_num = request.args.get("page_num",1)
    is_foaming = request.args.get("is_foaming","all")
    per_page = request.args.get("per_page",10)
    [images_list,total_pages] = ImageService.get_images(page_num,is_foaming,per_page)
    return jsonify({"images": images_list,"totalPages":total_pages})


@app.route("/images/<id>", methods=["POST"])
def classify_image(id):
    "Classify image as foaming or not"
    is_foaming = request.json.get("isFoaming", None)
    return jsonify(ImageService.classify_image(id,is_foaming))