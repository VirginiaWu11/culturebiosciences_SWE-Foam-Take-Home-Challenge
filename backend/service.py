from models import db, Image
# from flask_sqlalchemy import SQLAlchemy

import requests

class ImageService:
    @classmethod
    def get_images(cls,page_num):
        images = Image.query.paginate(per_page=10,page=page_num)
        return [Image.serialize(image) for image in images.items]