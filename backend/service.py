from models import db, Image
from datetime import datetime

import requests

class ImageService:
    @classmethod
    def get_images(cls,page_num = 1,is_foaming = "all",per_page = 5):
        page_num = int(page_num)
        print("per_page***",per_page)
        per_page = int(per_page)
        if is_foaming == 'all':
            images = Image.query.paginate(per_page=per_page,page=page_num)
        elif is_foaming == 'None':
            images = Image.query.filter(Image.is_foaming.is_(None)).paginate(per_page=per_page,page=page_num)
        else:
            images = Image.query.filter_by(is_foaming=is_foaming).paginate(per_page=per_page,page=page_num)
        total_pages = images.pages
        images_list = [Image.serialize(image) for image in images.items]
        return [images_list,total_pages]

    @classmethod
    def classify_image(cls,id,is_foaming):
        image = Image.query.get(id)
        image.last_modified = datetime.utcnow()
        image.is_foaming = is_foaming
        db.session.commit()
        return Image.serialize(image)