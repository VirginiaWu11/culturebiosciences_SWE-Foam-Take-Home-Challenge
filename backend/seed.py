from app import app
from models import db, Image

db.drop_all()
db.create_all()

image1 = Image(
    url="https://take-home-foam-challenge.s3.us-west-2.amazonaws.com/prod-exp13436-2020-01-08-at-04.24.38-9zijoye9dteugy6agooo506u3c6wrin920a99mavvv4z9mahkt7qbu6thl2l3v39.png",
    last_modified="2022-02-23T21:31:27.000Z",
    date_created="2022-02-23T21:31:27.000Z",
)


db.session.add_all(
    [
        image1,
    ]
)

db.session.commit()
