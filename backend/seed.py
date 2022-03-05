from app import app
from models import db, Image
from csv import DictReader

db.drop_all()
db.create_all()

with open("generator/images.csv") as images:
    db.session.bulk_insert_mappings(Image, DictReader(images))

db.session.commit()
