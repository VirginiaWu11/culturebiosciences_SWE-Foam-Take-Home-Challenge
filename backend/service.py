from models import db, Image
from datetime import datetime

import requests

class ImageService:
    @classmethod
    def get_images(cls,page_num):
        images = Image.query.paginate(per_page=10,page=page_num)
        return [Image.serialize(image) for image in images.items]

    @classmethod
    def classify_image(cls,id,is_foaming):
        image = Image.query.get(id)
        image.last_modified = datetime.utcnow()
        image.is_foaming = is_foaming
        db.session.commit()
        return Image.serialize(image)