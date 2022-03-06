from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Image(db.Model):
    """Image Model - shows current state of images"""

    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String, nullable=False)
    last_modified = db.Column(db.DateTime, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)
    is_foaming = db.Column(db.Boolean, nullable=True)

    def serialize(self):
        """Returns a dictionary representation of images to turn into JSON"""
        return {
            "id": self.id,
            "url": self.url,
            "lastModified": self.last_modified,
            "dateCreated": self.date_created,
            "isFoaming": self.is_foaming,
        }
